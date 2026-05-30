import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../core/guards/permissions.guard';
import { RequirePermissions } from '../../../../core/decorators/require-permissions.decorator';
import { Audit } from '../../../../core/decorators/audit.decorator';

import { CreateUnitDto } from '../../application/dto/create-unit.dto';
import { UpdateUnitDto } from '../../application/dto/update-unit.dto';

import { GetUnitsUseCase } from '../../application/use-cases/get-units.use-case';
import { GetUnitByIdUseCase } from '../../application/use-cases/get-unit-by-id.use-case';
import { CreateUnitUseCase } from '../../application/use-cases/create-unit.use-case';
import { UpdateUnitUseCase } from '../../application/use-cases/update-unit.use-case';
import { ToggleUnitUseCase } from '../../application/use-cases/toggle-unit.use-case';

@ApiTags('Units')
@ApiBearerAuth()
@Controller('units')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class UnitsController {
  constructor(
    private readonly getUnitsUseCase: GetUnitsUseCase,
    private readonly getUnitByIdUseCase: GetUnitByIdUseCase,
    private readonly createUnitUseCase: CreateUnitUseCase,
    private readonly updateUnitUseCase: UpdateUnitUseCase,
    private readonly toggleUnitUseCase: ToggleUnitUseCase,
  ) {}

  @Get()
  @RequirePermissions('units.read')
  @Audit('Listar unidades')
  @ApiOperation({ summary: 'Listar unidades' })
  findAll() {
    return this.getUnitsUseCase.execute();
  }

  @Get(':id')
  @RequirePermissions('units.read')
  @Audit('Obtener unidad')
  @ApiOperation({ summary: 'Obtener unidad por ID' })
  findById(@Param('id') id: string) {
    return this.getUnitByIdUseCase.execute(id);
  }

  @Post()
  @RequirePermissions('units.create')
  @Audit('Crear unidad')
  @ApiOperation({ summary: 'Crear unidad' })
  create(@Body() dto: CreateUnitDto) {
    return this.createUnitUseCase.execute(dto);
  }

  @Patch(':id')
  @RequirePermissions('units.update')
  @Audit('Editar unidad')
  @ApiOperation({ summary: 'Editar unidad' })
  update(@Param('id') id: string, @Body() dto: UpdateUnitDto) {
    return this.updateUnitUseCase.execute(id, dto);
  }

  @Patch(':id/toggle')
  @RequirePermissions('units.toggle')
  @Audit('Activar/Inactivar unidad')
  @ApiOperation({ summary: 'Activar/Inactivar unidad' })
  toggle(@Param('id') id: string) {
    return this.toggleUnitUseCase.execute(id);
  }
}
