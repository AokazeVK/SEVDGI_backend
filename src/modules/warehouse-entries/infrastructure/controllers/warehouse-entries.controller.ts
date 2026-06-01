import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Audit } from '../../../../core/decorators/audit.decorator';
import { RequirePermissions } from '../../../../core/decorators/require-permissions.decorator';
import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../core/guards/permissions.guard';

import { CreateWarehouseEntryDto } from '../../application/dto/create-warehouse-entry.dto';
import { UpdateWarehouseEntryDto } from '../../application/dto/update-warehouse-entry.dto';

import { CreateWarehouseEntryUseCase } from '../../application/use-cases/create-warehouse-entry.use-case';
import { GetWarehouseEntriesUseCase } from '../../application/use-cases/get-warehouse-entries.use-case';
import { GetWarehouseEntryByIdUseCase } from '../../application/use-cases/get-warehouse-entry-by-id.use-case';
import { UpdateWarehouseEntryUseCase } from '../../application/use-cases/update-warehouse-entry.use-case';

@ApiTags('Warehouse Entries')
@ApiBearerAuth()
@Controller('warehouse-entries')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class WarehouseEntriesController {
  constructor(
    private readonly getWarehouseEntriesUseCase: GetWarehouseEntriesUseCase,
    private readonly getWarehouseEntryByIdUseCase: GetWarehouseEntryByIdUseCase,
    private readonly createWarehouseEntryUseCase: CreateWarehouseEntryUseCase,
    private readonly updateWarehouseEntryUseCase: UpdateWarehouseEntryUseCase,
  ) {}

  @Get()
  @RequirePermissions('warehouse-entries.read')
  @Audit('Listar ingresos al almacén')
  @ApiOperation({ summary: 'Listar ingresos al almacén' })
  findAll() {
    return this.getWarehouseEntriesUseCase.execute();
  }

  @Get(':id')
  @RequirePermissions('warehouse-entries.read')
  @Audit('Obtener ingreso al almacén')
  @ApiOperation({ summary: 'Obtener ingreso al almacén por ID' })
  findById(@Param('id') id: string) {
    return this.getWarehouseEntryByIdUseCase.execute(id);
  }

  @Post()
  @RequirePermissions('warehouse-entries.create')
  @Audit('Registrar ingreso al almacén')
  @ApiOperation({ summary: 'Registrar ingreso al almacén' })
  create(@Body() dto: CreateWarehouseEntryDto) {
    return this.createWarehouseEntryUseCase.execute(dto);
  }

  @Patch(':id')
  @RequirePermissions('warehouse-entries.update')
  @Audit('Editar ingreso al almacén')
  @ApiOperation({ summary: 'Editar ingreso al almacén' })
  update(@Param('id') id: string, @Body() dto: UpdateWarehouseEntryDto) {
    return this.updateWarehouseEntryUseCase.execute(id, dto);
  }
}
