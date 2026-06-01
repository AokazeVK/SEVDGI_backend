import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Audit } from '../../../../core/decorators/audit.decorator';
import { RequirePermissions } from '../../../../core/decorators/require-permissions.decorator';
import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../core/guards/permissions.guard';

import { CreateWarehouseDto } from '../../application/dto/create-warehouse.dto';
import { UpdateWarehouseDto } from '../../application/dto/update-warehouse.dto';

import { CreateWarehouseUseCase } from '../../application/use-cases/create-warehouse.use-case';
import { GetWarehouseByIdUseCase } from '../../application/use-cases/get-warehouse-by-id.use-case';
import { GetWarehouseUseCase } from '../../application/use-cases/get-warehouse.use-case';
import { ToggleWarehouseUseCase } from '../../application/use-cases/toggle-warehouse.use-case';
import { UpdateWarehouseUseCase } from '../../application/use-cases/update-warehouse.use-case';

@ApiTags('Warehouse')
@ApiBearerAuth()
@Controller('warehouse')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class WarehouseController {
  constructor(
    private readonly getWarehouseUseCase: GetWarehouseUseCase,
    private readonly getWarehouseByIdUseCase: GetWarehouseByIdUseCase,
    private readonly createWarehouseUseCase: CreateWarehouseUseCase,
    private readonly updateWarehouseUseCase: UpdateWarehouseUseCase,
    private readonly toggleWarehouseUseCase: ToggleWarehouseUseCase,
  ) {}

  @Get()
  @RequirePermissions('warehouse.read')
  @Audit('Listar almacenes')
  @ApiOperation({ summary: 'Listar almacenes' })
  findAll() {
    return this.getWarehouseUseCase.execute();
  }

  @Get(':id')
  @RequirePermissions('warehouse.read')
  @Audit('Obtener almacén')
  @ApiOperation({ summary: 'Obtener almacén por ID' })
  findById(@Param('id') id: string) {
    return this.getWarehouseByIdUseCase.execute(id);
  }

  @Post()
  @RequirePermissions('warehouse.create')
  @Audit('Crear almacén')
  @ApiOperation({ summary: 'Crear almacén' })
  create(@Body() dto: CreateWarehouseDto) {
    return this.createWarehouseUseCase.execute(dto);
  }

  @Patch(':id')
  @RequirePermissions('warehouse.update')
  @Audit('Editar almacén')
  @ApiOperation({ summary: 'Editar almacén' })
  update(@Param('id') id: string, @Body() dto: UpdateWarehouseDto) {
    return this.updateWarehouseUseCase.execute(id, dto);
  }

  @Patch(':id/toggle')
  @RequirePermissions('warehouse.toggle')
  @Audit('Activar/Inactivar almacén')
  @ApiOperation({ summary: 'Activar/Inactivar almacén' })
  toggle(@Param('id') id: string) {
    return this.toggleWarehouseUseCase.execute(id);
  }
}
