import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../core/guards/permissions.guard';
import { RequirePermissions } from '../../../../core/decorators/require-permissions.decorator';
import { Audit } from '../../../../core/decorators/audit.decorator';

import { GetPermissionsUseCase } from '../../application/use-cases/get-permissions.use-case';

@ApiTags('Permissions')
@ApiBearerAuth()
@Controller('permissions')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class PermissionsController {
  constructor(private readonly getPermissionsUseCase: GetPermissionsUseCase) {}

  @Get()
  @RequirePermissions('permissions.read')
  @Audit('Listar permisos')
  @ApiOperation({ summary: 'Listar permisos' })
  findAll() {
    return this.getPermissionsUseCase.execute();
  }
}
