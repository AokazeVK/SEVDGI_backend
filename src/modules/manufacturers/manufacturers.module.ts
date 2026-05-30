import { Module } from '@nestjs/common';

import { MANUFACTURERS_REPOSITORY } from './domain/repositories/manufacturers.repository';
import { PrismaManufacturersRepository } from './infrastructure/repositories/prisma-manufacturers.repository';

import { ManufacturersController } from './infrastructure/controllers/manufacturers.controller';

import { GetManufacturersUseCase } from './application/use-cases/get-manufacturers.use-case';
import { GetManufacturerByIdUseCase } from './application/use-cases/get-manufacturer-by-id.use-case';
import { CreateManufacturerUseCase } from './application/use-cases/create-manufacturer.use-case';
import { UpdateManufacturerUseCase } from './application/use-cases/update-manufacturer.use-case';
import { ToggleManufacturerUseCase } from './application/use-cases/toggle-manufacturer.use-case';

@Module({
  controllers: [ManufacturersController],
  providers: [
    GetManufacturersUseCase,
    GetManufacturerByIdUseCase,
    CreateManufacturerUseCase,
    UpdateManufacturerUseCase,
    ToggleManufacturerUseCase,
    {
      provide: MANUFACTURERS_REPOSITORY,
      useClass: PrismaManufacturersRepository,
    },
  ],
})
export class ManufacturersModule {}