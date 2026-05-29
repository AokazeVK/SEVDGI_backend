import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/prisma/prisma.service';
import {
  AuthRepository,
  AuthUserRecord,
} from '../../domain/repositories/auth.repository';

@Injectable()
export class PrismaAuthRepository implements AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findActiveUserByUsernameOrEmail(
    usernameOrEmail: string,
  ): Promise<AuthUserRecord | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        isActive: true,
        OR: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      },
      include: {
        roles: {
          include: {
            role: {
              include: {
                permissions: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!user) return null;

    const roles = user.roles
      .filter((userRole) => userRole.role.isActive)
      .map((userRole) => userRole.role.name);

    const permissions = [
      ...new Set(
        user.roles.flatMap((userRole) =>
          userRole.role.permissions
            .filter(
              (rolePermission) =>
                userRole.role.isActive && rolePermission.permission.isActive,
            )
            .map((rolePermission) => rolePermission.permission.code),
        ),
      ),
    ];

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      passwordHash: user.passwordHash,
      roles,
      permissions,
    };
  }
}
