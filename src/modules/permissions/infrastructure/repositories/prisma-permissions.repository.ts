import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/prisma/prisma.service';
import { PermissionEntity } from '../../domain/entities/permission.entity';
import { PermissionsRepository } from '../../domain/repositories/permissions.repository';

@Injectable()
export class PrismaPermissionsRepository implements PermissionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<PermissionEntity[]> {
    const permissions = await this.prisma.permission.findMany({
      orderBy: [{ module: 'asc' }, { code: 'asc' }],
    });

    return permissions.map(
      (permission) =>
        new PermissionEntity(
          permission.id,
          permission.code,
          permission.name,
          permission.module,
          permission.description,
          permission.isActive,
        ),
    );
  }
}
