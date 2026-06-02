import { Module } from '@nestjs/common';

import { PHARMACY_INVENTORY_REPOSITORY } from './domain/repositories/pharmacy-inventory.repository';
import { PrismaPharmacyInventoryRepository } from './infrastructure/repositories/prisma-pharmacy-inventory.repository';

import { PharmacyInventoryController } from './infrastructure/controllers/pharmacy-inventory.controller';

import { GetFefoInventoryUseCase } from './application/use-cases/get-fefo-inventory.use-case';
import { GetInventoryByMedicineUseCase } from './application/use-cases/get-inventory-by-medicine.use-case';
import { GetInventoryByPharmacyUseCase } from './application/use-cases/get-inventory-by-pharmacy.use-case';
import { GetPharmacyInventoryByIdUseCase } from './application/use-cases/get-pharmacy-inventory-by-id.use-case';
import { GetPharmacyInventoryUseCase } from './application/use-cases/get-pharmacy-inventory.use-case';

@Module({
  controllers: [PharmacyInventoryController],
  providers: [
    GetPharmacyInventoryUseCase,
    GetPharmacyInventoryByIdUseCase,
    GetInventoryByPharmacyUseCase,
    GetInventoryByMedicineUseCase,
    GetFefoInventoryUseCase,
    {
      provide: PHARMACY_INVENTORY_REPOSITORY,
      useClass: PrismaPharmacyInventoryRepository,
    },
  ],
})
export class PharmacyInventoryModule {}
