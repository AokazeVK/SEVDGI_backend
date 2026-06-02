import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { Audit } from '../../../../core/decorators/audit.decorator';
import { RequirePermissions } from '../../../../core/decorators/require-permissions.decorator';
import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../core/guards/permissions.guard';

import { GetFefoInventoryUseCase } from '../../application/use-cases/get-fefo-inventory.use-case';
import { GetInventoryByMedicineUseCase } from '../../application/use-cases/get-inventory-by-medicine.use-case';
import { GetInventoryByPharmacyUseCase } from '../../application/use-cases/get-inventory-by-pharmacy.use-case';
import { GetPharmacyInventoryByIdUseCase } from '../../application/use-cases/get-pharmacy-inventory-by-id.use-case';
import { GetPharmacyInventoryUseCase } from '../../application/use-cases/get-pharmacy-inventory.use-case';

@ApiTags('Pharmacy Inventory')
@ApiBearerAuth()
@Controller('pharmacy-inventory')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class PharmacyInventoryController {
  constructor(
    private readonly getPharmacyInventoryUseCase: GetPharmacyInventoryUseCase,
    private readonly getPharmacyInventoryByIdUseCase: GetPharmacyInventoryByIdUseCase,
    private readonly getInventoryByPharmacyUseCase: GetInventoryByPharmacyUseCase,
    private readonly getInventoryByMedicineUseCase: GetInventoryByMedicineUseCase,
    private readonly getFefoInventoryUseCase: GetFefoInventoryUseCase,
  ) {}

  @Get()
  @RequirePermissions('pharmacy-inventory.read')
  @Audit('Listar inventario de farmacia')
  @ApiOperation({ summary: 'Listar inventario de farmacia' })
  findAll() {
    return this.getPharmacyInventoryUseCase.execute();
  }

  @Get('fefo')
  @RequirePermissions('pharmacy-inventory.fefo')
  @Audit('Consultar inventario FEFO de farmacia')
  @ApiOperation({
    summary: 'Consultar stock disponible en farmacia ordenado por vencimiento FEFO',
  })
  @ApiQuery({ name: 'pharmacyId', required: true })
  @ApiQuery({ name: 'medicineId', required: true })
  findFefo(@Query('pharmacyId') pharmacyId: string, @Query('medicineId') medicineId: string) {
    return this.getFefoInventoryUseCase.execute(pharmacyId, medicineId);
  }

  @Get('pharmacy/:pharmacyId')
  @RequirePermissions('pharmacy-inventory.read')
  @Audit('Consultar inventario por farmacia')
  @ApiOperation({ summary: 'Consultar inventario por farmacia' })
  findByPharmacy(@Param('pharmacyId') pharmacyId: string) {
    return this.getInventoryByPharmacyUseCase.execute(pharmacyId);
  }

  @Get('medicine/:medicineId')
  @RequirePermissions('pharmacy-inventory.read')
  @Audit('Consultar inventario por medicamento en farmacia')
  @ApiOperation({ summary: 'Consultar inventario por medicamento en farmacia' })
  findByMedicine(@Param('medicineId') medicineId: string) {
    return this.getInventoryByMedicineUseCase.execute(medicineId);
  }

  @Get(':id')
  @RequirePermissions('pharmacy-inventory.read')
  @Audit('Obtener inventario de farmacia')
  @ApiOperation({ summary: 'Obtener inventario de farmacia por ID' })
  findById(@Param('id') id: string) {
    return this.getPharmacyInventoryByIdUseCase.execute(id);
  }
}
