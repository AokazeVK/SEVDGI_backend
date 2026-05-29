import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../core/guards/permissions.guard';
import { RequirePermissions } from '../../../../core/decorators/require-permissions.decorator';
import { Audit } from '../../../../core/decorators/audit.decorator';

import { CreateRoleDto } from '../../application/dto/create-role.dto';
import { UpdateRoleDto } from '../../application/dto/update-role.dto';
import { AssignPermissionsDto } from '../../application/dto/assign-permissions.dto';

import { GetRolesUseCase } from '../../application/use-cases/get-roles.use-case';
import { GetRoleByIdUseCase } from '../../application/use-cases/get-role-by-id.use-case';
import { CreateRoleUseCase } from '../../application/use-cases/create-role.use-case';
import { UpdateRoleUseCase } from '../../application/use-cases/update-role.use-case';
import { ToggleRoleUseCase } from '../../application/use-cases/toggle-role.use-case';
import { AssignPermissionsToRoleUseCase } from '../../application/use-cases/assign-permissions-to-role.use-case';

@ApiTags('Roles')
@ApiBearerAuth()
@Controller('roles')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class RolesController {
  constructor(
    private readonly getRolesUseCase: GetRolesUseCase,
    private readonly getRoleByIdUseCase: GetRoleByIdUseCase,
    private readonly createRoleUseCase: CreateRoleUseCase,
    private readonly updateRoleUseCase: UpdateRoleUseCase,
    private readonly toggleRoleUseCase: ToggleRoleUseCase,
    private readonly assignPermissionsToRoleUseCase: AssignPermissionsToRoleUseCase,
  ) {}

  @Get()
  @RequirePermissions('roles.read')
  @Audit('Listar roles')
  @ApiOperation({ summary: 'Listar roles' })
  findAll() {
    return this.getRolesUseCase.execute();
  }

  @Get(':id')
  @RequirePermissions('roles.read')
  @Audit('Obtener rol')
  @ApiOperation({ summary: 'Obtener rol por ID' })
  findById(@Param('id') id: string) {
    return this.getRoleByIdUseCase.execute(id);
  }

  @Post()
  @RequirePermissions('roles.create')
  @Audit('Crear rol')
  @ApiOperation({ summary: 'Crear rol' })
  create(@Body() dto: CreateRoleDto) {
    return this.createRoleUseCase.execute(dto);
  }

  @Patch(':id')
  @RequirePermissions('roles.update')
  @Audit('Editar rol')
  @ApiOperation({ summary: 'Editar rol' })
  update(@Param('id') id: string, @Body() dto: UpdateRoleDto) {
    return this.updateRoleUseCase.execute(id, dto);
  }

  @Patch(':id/toggle')
  @RequirePermissions('roles.toggle')
  @Audit('Activar/Inactivar rol')
  @ApiOperation({ summary: 'Activar/Inactivar rol' })
  toggle(@Param('id') id: string) {
    return this.toggleRoleUseCase.execute(id);
  }

  @Patch(':id/permissions')
  @RequirePermissions('roles.assign_permissions')
  @Audit('Asignar permisos a rol')
  @ApiOperation({ summary: 'Asignar permisos a rol' })
  assignPermissions(
    @Param('id') id: string,
    @Body() dto: AssignPermissionsDto,
  ) {
    return this.assignPermissionsToRoleUseCase.execute(id, dto);
  }
}
