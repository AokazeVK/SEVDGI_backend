import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../core/guards/permissions.guard';
import { RequirePermissions } from '../../../../core/decorators/require-permissions.decorator';
import { Audit } from '../../../../core/decorators/audit.decorator';

import { CreateTherapeuticGroupDto } from '../../application/dto/create-therapeutic-group.dto';
import { UpdateTherapeuticGroupDto } from '../../application/dto/update-therapeutic-group.dto';

import { GetTherapeuticGroupsUseCase } from '../../application/use-cases/get-therapeutic-groups.use-case';
import { GetTherapeuticGroupByIdUseCase } from '../../application/use-cases/get-therapeutic-group-by-id.use-case';
import { CreateTherapeuticGroupUseCase } from '../../application/use-cases/create-therapeutic-group.use-case';
import { UpdateTherapeuticGroupUseCase } from '../../application/use-cases/update-therapeutic-group.use-case';
import { ToggleTherapeuticGroupUseCase } from '../../application/use-cases/toggle-therapeutic-group.use-case';

@ApiTags('Therapeutic Groups')
@ApiBearerAuth()
@Controller('therapeutic-groups')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class TherapeuticGroupsController {
  constructor(
    private readonly getTherapeuticGroupsUseCase: GetTherapeuticGroupsUseCase,
    private readonly getTherapeuticGroupByIdUseCase: GetTherapeuticGroupByIdUseCase,
    private readonly createTherapeuticGroupUseCase: CreateTherapeuticGroupUseCase,
    private readonly updateTherapeuticGroupUseCase: UpdateTherapeuticGroupUseCase,
    private readonly toggleTherapeuticGroupUseCase: ToggleTherapeuticGroupUseCase,
  ) {}

  @Get()
  @RequirePermissions('therapeutic-groups.read')
  @Audit('Listar grupos terapéuticos')
  @ApiOperation({ summary: 'Listar grupos terapéuticos' })
  findAll() {
    return this.getTherapeuticGroupsUseCase.execute();
  }

  @Get(':id')
  @RequirePermissions('therapeutic-groups.read')
  @Audit('Obtener grupo terapéutico')
  @ApiOperation({ summary: 'Obtener grupo terapéutico por ID' })
  findById(@Param('id') id: string) {
    return this.getTherapeuticGroupByIdUseCase.execute(id);
  }

  @Post()
  @RequirePermissions('therapeutic-groups.create')
  @Audit('Crear grupo terapéutico')
  @ApiOperation({ summary: 'Crear grupo terapéutico' })
  create(@Body() dto: CreateTherapeuticGroupDto) {
    return this.createTherapeuticGroupUseCase.execute(dto);
  }

  @Patch(':id')
  @RequirePermissions('therapeutic-groups.update')
  @Audit('Editar grupo terapéutico')
  @ApiOperation({ summary: 'Editar grupo terapéutico' })
  update(@Param('id') id: string, @Body() dto: UpdateTherapeuticGroupDto) {
    return this.updateTherapeuticGroupUseCase.execute(id, dto);
  }

  @Patch(':id/toggle')
  @RequirePermissions('therapeutic-groups.toggle')
  @Audit('Activar/Inactivar grupo terapéutico')
  @ApiOperation({ summary: 'Activar/Inactivar grupo terapéutico' })
  toggle(@Param('id') id: string) {
    return this.toggleTherapeuticGroupUseCase.execute(id);
  }
}
