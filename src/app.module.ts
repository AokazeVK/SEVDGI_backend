import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from './core/prisma/prisma.module';
import { AuditInterceptor } from './core/interceptors/audit.interceptor';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { AuditModule } from './modules/audit/audit.module';

import { MedicinesModule } from './modules/medicines/medicines.module';
import { LaboratoriesModule } from './modules/laboratories/laboratories.module';
import { SuppliersModule } from './modules/suppliers/suppliers.module';

import { DocumentsModule } from './modules/documents/documents.module';
import { OcrModule } from './modules/ocr/ocr.module';
import { ExpertSystemModule } from './modules/expert-system/expert-system.module';

import { WarehouseModule } from './modules/warehouse/warehouse.module';
import { PharmacyModule } from './modules/pharmacy/pharmacy.module';
import { MedicineBatchesModule } from './modules/medicine-batches/medicine-batches.module';
import { PrescriptionsModule } from './modules/prescriptions/prescriptions.module';
import { RequestsModule } from './modules/requests/requests.module';
import { DispatchesModule } from './modules/dispatches/dispatches.module';
import { KardexModule } from './modules/kardex/kardex.module';
import { TherapeuticGroupsModule } from './modules/therapeutic-groups/therapeutic-groups.module';
import { ReportsModule } from './modules/reports/reports.module';
import { FilesModule } from './modules/files/files.module';
import { SettingsModule } from './modules/settings/settings.module';
import { PharmaceuticalFormsModule } from './modules/pharmaceutical-forms/pharmaceutical-forms.module';
import { ManufacturersModule } from './modules/manufacturers/manufacturers.module';
import { ActiveIngredientsModule } from './modules/active-ingredients/active-ingredients.module';
import { UnitsModule } from './modules/units/units.module';
import { WarehouseEntriesModule } from './modules/warehouse-entries/warehouse-entries.module';
import { WarehouseInventoryModule } from './modules/warehouse-inventory/warehouse-inventory.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    PrismaModule,
    AuthModule,
    UsersModule,
    RolesModule,
    PermissionsModule,
    AuditModule,
    ActiveIngredientsModule,
    MedicinesModule,
    MedicineBatchesModule,
    LaboratoriesModule,
    SuppliersModule,
    ManufacturersModule,
    DocumentsModule,
    OcrModule,
    ExpertSystemModule,
    WarehouseEntriesModule,
    PharmaceuticalFormsModule,
    WarehouseModule,
    WarehouseInventoryModule,
    PharmacyModule,
    UnitsModule,
    PrescriptionsModule,
    RequestsModule,
    DispatchesModule,
    KardexModule,
    TherapeuticGroupsModule,
    ReportsModule,
    FilesModule,
    SettingsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditInterceptor,
    },
  ],
})
export class AppModule {}
