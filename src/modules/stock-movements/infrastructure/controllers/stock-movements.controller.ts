import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Audit } from '../../../../core/decorators/audit.decorator';
import { RequirePermissions } from '../../../../core/decorators/require-permissions.decorator';
import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../core/guards/permissions.guard';

import { GetStockMovementByIdUseCase } from '../../application/use-cases/get-stock-movement-by-id.use-case';
import { GetStockMovementsByBatchUseCase } from '../../application/use-cases/get-stock-movements-by-batch.use-case';
import { GetStockMovementsByMedicineUseCase } from '../../application/use-cases/get-stock-movements-by-medicine.use-case';
import { GetStockMovementsByPharmacyUseCase } from '../../application/use-cases/get-stock-movements-by-pharmacy.use-case';
import { GetStockMovementsByWarehouseUseCase } from '../../application/use-cases/get-stock-movements-by-warehouse.use-case';
import { GetStockMovementsUseCase } from '../../application/use-cases/get-stock-movements.use-case';

@ApiTags('Stock Movements')
@ApiBearerAuth()
@Controller('stock-movements')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class StockMovementsController {
  constructor(
    private readonly getStockMovementsUseCase: GetStockMovementsUseCase,
    private readonly getStockMovementByIdUseCase: GetStockMovementByIdUseCase,
    private readonly getStockMovementsByMedicineUseCase: GetStockMovementsByMedicineUseCase,
    private readonly getStockMovementsByBatchUseCase: GetStockMovementsByBatchUseCase,
    private readonly getStockMovementsByWarehouseUseCase: GetStockMovementsByWarehouseUseCase,
    private readonly getStockMovementsByPharmacyUseCase: GetStockMovementsByPharmacyUseCase,
  ) {}

  @Get()
  @RequirePermissions('stock-movements.read')
  @Audit('Listar movimientos de stock')
  @ApiOperation({ summary: 'Listar movimientos de stock' })
  findAll() {
    return this.getStockMovementsUseCase.execute();
  }

  @Get('medicine/:medicineId')
  @RequirePermissions('stock-movements.read')
  @Audit('Consultar movimientos por medicamento')
  @ApiOperation({ summary: 'Consultar movimientos por medicamento' })
  findByMedicine(@Param('medicineId') medicineId: string) {
    return this.getStockMovementsByMedicineUseCase.execute(medicineId);
  }

  @Get('batch/:batchId')
  @RequirePermissions('stock-movements.read')
  @Audit('Consultar movimientos por lote')
  @ApiOperation({ summary: 'Consultar movimientos por lote' })
  findByBatch(@Param('batchId') batchId: string) {
    return this.getStockMovementsByBatchUseCase.execute(batchId);
  }

  @Get('warehouse/:warehouseId')
  @RequirePermissions('stock-movements.read')
  @Audit('Consultar movimientos por almacén')
  @ApiOperation({ summary: 'Consultar movimientos por almacén' })
  findByWarehouse(@Param('warehouseId') warehouseId: string) {
    return this.getStockMovementsByWarehouseUseCase.execute(warehouseId);
  }

  @Get('pharmacy/:pharmacyId')
  @RequirePermissions('stock-movements.read')
  @Audit('Consultar movimientos por farmacia')
  @ApiOperation({ summary: 'Consultar movimientos por farmacia' })
  findByPharmacy(@Param('pharmacyId') pharmacyId: string) {
    return this.getStockMovementsByPharmacyUseCase.execute(pharmacyId);
  }

  @Get(':id')
  @RequirePermissions('stock-movements.read')
  @Audit('Obtener movimiento de stock')
  @ApiOperation({ summary: 'Obtener movimiento de stock por ID' })
  findById(@Param('id') id: string) {
    return this.getStockMovementByIdUseCase.execute(id);
  }
}
