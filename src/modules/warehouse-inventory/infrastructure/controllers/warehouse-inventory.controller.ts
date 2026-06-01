import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../core/guards/permissions.guard';
import { RequirePermissions } from '../../../../core/decorators/require-permissions.decorator';
import { Audit } from '../../../../core/decorators/audit.decorator';

import { GetWarehouseInventoryUseCase } from '../../application/use-cases/get-warehouse-inventory.use-case';
import { GetWarehouseInventoryByIdUseCase } from '../../application/use-cases/get-warehouse-inventory-by-id.use-case';
import { GetInventoryByWarehouseUseCase } from '../../application/use-cases/get-inventory-by-warehouse.use-case';
import { GetInventoryByMedicineUseCase } from '../../application/use-cases/get-inventory-by-medicine.use-case';
import { GetFefoInventoryUseCase } from '../../application/use-cases/get-fefo-inventory.use-case';

@ApiTags('Warehouse Inventory')
@ApiBearerAuth()
@Controller('warehouse-inventory')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class WarehouseInventoryController {
  constructor(
    private readonly getWarehouseInventoryUseCase: GetWarehouseInventoryUseCase,
    private readonly getWarehouseInventoryByIdUseCase: GetWarehouseInventoryByIdUseCase,
    private readonly getInventoryByWarehouseUseCase: GetInventoryByWarehouseUseCase,
    private readonly getInventoryByMedicineUseCase: GetInventoryByMedicineUseCase,
    private readonly getFefoInventoryUseCase: GetFefoInventoryUseCase,
  ) {}

  @Get()
  @RequirePermissions('warehouse.read')
  @Audit('Listar inventario de almacén')
  @ApiOperation({ summary: 'Listar inventario de almacén' })
  findAll() {
    return this.getWarehouseInventoryUseCase.execute();
  }

  @Get('fefo')
  @RequirePermissions('warehouse.read')
  @Audit('Consultar inventario FEFO')
  @ApiOperation({ summary: 'Consultar stock disponible ordenado por vencimiento FEFO' })
  @ApiQuery({ name: 'warehouseId', required: true })
  @ApiQuery({ name: 'medicineId', required: true })
  findFefo(@Query('warehouseId') warehouseId: string, @Query('medicineId') medicineId: string) {
    return this.getFefoInventoryUseCase.execute(warehouseId, medicineId);
  }

  @Get('warehouse/:warehouseId')
  @RequirePermissions('warehouse.read')
  @Audit('Consultar inventario por almacén')
  @ApiOperation({ summary: 'Consultar inventario por almacén' })
  findByWarehouse(@Param('warehouseId') warehouseId: string) {
    return this.getInventoryByWarehouseUseCase.execute(warehouseId);
  }

  @Get('medicine/:medicineId')
  @RequirePermissions('warehouse.read')
  @Audit('Consultar inventario por medicamento')
  @ApiOperation({ summary: 'Consultar inventario por medicamento' })
  findByMedicine(@Param('medicineId') medicineId: string) {
    return this.getInventoryByMedicineUseCase.execute(medicineId);
  }

  @Get(':id')
  @RequirePermissions('warehouse.read')
  @Audit('Obtener inventario de almacén')
  @ApiOperation({ summary: 'Obtener inventario de almacén por ID' })
  findById(@Param('id') id: string) {
    return this.getWarehouseInventoryByIdUseCase.execute(id);
  }
}
