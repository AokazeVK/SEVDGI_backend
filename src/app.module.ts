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
import { PharmacyReceptionsModule } from './modules/pharmacy-receptions/pharmacy-receptions.module';
import { PharmacyInventoryModule } from './modules/pharmacy-inventory/pharmacy-inventory.module';
import { PatientsModule } from './modules/patients/patients.module';
import { DoctorsModule } from './modules/doctors/doctors.module';
import { PharmacyDispensationsModule } from './modules/pharmacy-dispensations/pharmacy-dispensations.module';
import { MedicalServicesModule } from './modules/medical-services/medical-services.module';
import { SanitaryRegistrationsModule } from './modules/sanitary-registrations/sanitary-registrations.module';
import { AlertsModule } from './modules/alerts/alerts.module';
import { ScheduleModule } from '@nestjs/schedule';
import { StockMovementsModule } from './modules/stock-movements/stock-movements.module';
import { DocumentTypesModule } from './modules/document-types/document-types.module';
import { DocumentFilesModule } from './modules/document-files/document-files.module';
import { OcrResultsModule } from './modules/ocr-results/ocr-results.module';
import { OcrExtractedFieldsModule } from './modules/ocr-extracted-fields/ocr-extracted-fields.module';
import { ExpertRulesModule } from './modules/expert-rules/expert-rules.module';
import { ValidationProcessesModule } from './modules/validation-processes/validation-processes.module';
import { InferenceEngineModule } from './modules/inference-engine/inference-engine.module';
import { ValidationResultsModule } from './modules/validation-results/validation-results.module';
import { FieldExtractionModule } from './modules/field-extraction/field-extraction.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    AuthModule,
    UsersModule,
    RolesModule,
    PermissionsModule,
    AuditModule,
    ActiveIngredientsModule,
    MedicinesModule,
    DocumentTypesModule,
    DocumentFilesModule,
    MedicineBatchesModule,
    LaboratoriesModule,
    SuppliersModule,
    StockMovementsModule,
    ManufacturersModule,
    PatientsModule,
    SanitaryRegistrationsModule,
    DoctorsModule,
    DocumentsModule,
    MedicalServicesModule,
    PharmacyReceptionsModule,
    PharmacyInventoryModule,
    PharmacyDispensationsModule,
    OcrModule,
    OcrResultsModule,
    OcrExtractedFieldsModule,
    AlertsModule,
    ExpertSystemModule,
    ExpertRulesModule,
    ValidationProcessesModule,
    ValidationResultsModule,
    FieldExtractionModule,
    InferenceEngineModule,
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
