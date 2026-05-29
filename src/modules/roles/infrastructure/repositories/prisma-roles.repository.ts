import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/prisma/prisma.service';
import { RoleEntity } from '../../domain/entities/role.entity';
import {
  CreateRoleData,
  RolesRepository,
  UpdateRoleData,
} from '../../domain/repositories/roles.repository';

@Injectable()
export class PrismaRolesRepository implements RolesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<RoleEntity[]> {
    const roles = await this.prisma.role.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        permissions: {
          include: {
            permission: true,
          },
        },
      },
    });

    return roles.map((role) => this.toEntity(role));
  }

  async findById(id: string): Promise<RoleEntity | null> {
    const role = await this.prisma.role.findUnique({
      where: { id },
      include: {
        permissions: {
          include: {
            permission: true,
          },
        },
      },
    });

    return role ? this.toEntity(role) : null;
  }

  async findByName(name: string): Promise<RoleEntity | null> {
    const role = await this.prisma.role.findUnique({
      where: { name },
      include: {
        permissions: {
          include: {
            permission: true,
          },
        },
      },
    });

    return role ? this.toEntity(role) : null;
  }

  async create(data: CreateRoleData): Promise<RoleEntity> {
    const role = await this.prisma.role.create({
      data: {
        name: data.name,
        description: data.description,
      },
      include: {
        permissions: {
          include: {
            permission: true,
          },
        },
      },
    });

    return this.toEntity(role);
  }

  async update(id: string, data: UpdateRoleData): Promise<RoleEntity> {
    const role = await this.prisma.role.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
      },
      include: {
        permissions: {
          include: {
            permission: true,
          },
        },
      },
    });

    return this.toEntity(role);
  }

  async toggle(id: string): Promise<RoleEntity> {
    const current = await this.prisma.role.findUnique({
      where: { id },
      select: { isActive: true },
    });

    const role = await this.prisma.role.update({
      where: { id },
      data: {
        isActive: !current?.isActive,
      },
      include: {
        permissions: {
          include: {
            permission: true,
          },
        },
      },
    });

    return this.toEntity(role);
  }

  async assignPermissions(
    roleId: string,
    permissionIds: string[],
  ): Promise<RoleEntity> {
    const role = await this.prisma.$transaction(async (tx) => {
      await tx.rolePermission.deleteMany({
        where: { roleId },
      });

      if (permissionIds.length > 0) {
        await tx.rolePermission.createMany({
          data: permissionIds.map((permissionId) => ({
            roleId,
            permissionId,
          })),
          skipDuplicates: true,
        });
      }

      return tx.role.findUnique({
        where: { id: roleId },
        include: {
          permissions: {
            include: {
              permission: true,
            },
          },
        },
      });
    });

    return this.toEntity(role);
  }

  private toEntity(role: any): RoleEntity {
    return new RoleEntity(
      role.id,
      role.name,
      role.description,
      role.isActive,
      role.permissions?.map((rp: any) => rp.permission.code) ?? [],
    );
  }
}
