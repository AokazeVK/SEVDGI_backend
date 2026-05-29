import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/prisma/prisma.service';
import { UserEntity } from '../../domain/entities/user.entity';
import {
  CreateUserData,
  UpdateUserData,
  UsersRepository,
} from '../../domain/repositories/users.repository';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });

    return users.map((user) => this.toEntity(user));
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });

    return user ? this.toEntity(user) : null;
  }

  async findByUsername(username: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { username },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });

    return user ? this.toEntity(user) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });

    return user ? this.toEntity(user) : null;
  }

  async create(data: CreateUserData): Promise<UserEntity> {
    const user = await this.prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        fullName: data.fullName,
        passwordHash: data.passwordHash,
        roles: data.roleIds?.length
          ? {
              create: data.roleIds.map((roleId) => ({
                role: {
                  connect: { id: roleId },
                },
              })),
            }
          : undefined,
      },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });

    return this.toEntity(user);
  }

  async update(id: string, data: UpdateUserData): Promise<UserEntity> {
    const user = await this.prisma.$transaction(async (tx) => {
      if (data.roleIds) {
        await tx.userRole.deleteMany({
          where: { userId: id },
        });

        if (data.roleIds.length > 0) {
          await tx.userRole.createMany({
            data: data.roleIds.map((roleId) => ({
              userId: id,
              roleId,
            })),
            skipDuplicates: true,
          });
        }
      }

      return tx.user.update({
        where: { id },
        data: {
          username: data.username,
          email: data.email,
          fullName: data.fullName,
        },
        include: {
          roles: {
            include: {
              role: true,
            },
          },
        },
      });
    });

    return this.toEntity(user);
  }

  async toggle(id: string): Promise<UserEntity> {
    const current = await this.prisma.user.findUnique({
      where: { id },
      select: { isActive: true },
    });

    const user = await this.prisma.user.update({
      where: { id },
      data: {
        isActive: !current?.isActive,
      },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });

    return this.toEntity(user);
  }

  private toEntity(user: any): UserEntity {
    return new UserEntity(
      user.id,
      user.username,
      user.email,
      user.fullName,
      user.isActive,
      user.roles?.map((userRole: any) => userRole.role.name) ?? [],
    );
  }
}
