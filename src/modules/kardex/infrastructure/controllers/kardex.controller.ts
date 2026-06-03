import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Audit } from '../../../../core/decorators/audit.decorator';
import { RequirePermissions } from '../../../../core/decorators/require-permissions.decorator';
import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../core/guards/permissions.guard';

import { GetKardexByIdUseCase } from '../../application/use-cases/get-kardex-by-id.use-case';
import { GetKardexByMedicineUseCase } from '../../application/use-cases/get-kardex-by-medicine.use-case';
import { GetKardexByPharmacyUseCase } from '../../application/use-cases/get-kardex-by-pharmacy.use-case';
import { GetKardexByWarehouseUseCase } from '../../application/use-cases/get-kardex-by-warehouse.use-case';
import { GetKardexUseCase } from '../../application/use-cases/get-kardex.use-case';

@ApiTags('Kardex')
@ApiBearerAuth()
@Controller('kardex')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class KardexController {
  constructor(
    private readonly getKardexUseCase: GetKardexUseCase,
    private readonly getKardexByIdUseCase: GetKardexByIdUseCase,
    private readonly getKardexByMedicineUseCase: GetKardexByMedicineUseCase,
    private readonly getKardexByWarehouseUseCase: GetKardexByWarehouseUseCase,
    private readonly getKardexByPharmacyUseCase: GetKardexByPharmacyUseCase,
  ) {}

  @Get()
  @RequirePermissions('kardex.read')
  @Audit('Listar kardex')
  @ApiOperation({ summary: 'Listar movimientos de kardex' })
  findAll() {
    return this.getKardexUseCase.execute();
  }

  @Get('medicine/:medicineId')
  @RequirePermissions('kardex.read')
  @Audit('Consultar kardex por medicamento')
  @ApiOperation({ summary: 'Consultar kardex por medicamento' })
  findByMedicine(@Param('medicineId') medicineId: string) {
    return this.getKardexByMedicineUseCase.execute(medicineId);
  }

  @Get('warehouse/:warehouseId')
  @RequirePermissions('kardex.read')
  @Audit('Consultar kardex por almacén')
  @ApiOperation({ summary: 'Consultar kardex por almacén' })
  findByWarehouse(@Param('warehouseId') warehouseId: string) {
    return this.getKardexByWarehouseUseCase.execute(warehouseId);
  }

  @Get('pharmacy/:pharmacyId')
  @RequirePermissions('kardex.read')
  @Audit('Consultar kardex por farmacia')
  @ApiOperation({ summary: 'Consultar kardex por farmacia' })
  findByPharmacy(@Param('pharmacyId') pharmacyId: string) {
    return this.getKardexByPharmacyUseCase.execute(pharmacyId);
  }

  @Get(':id')
  @RequirePermissions('kardex.read')
  @Audit('Obtener registro de kardex')
  @ApiOperation({ summary: 'Obtener registro de kardex por ID' })
  findById(@Param('id') id: string) {
    return this.getKardexByIdUseCase.execute(id);
  }
}
