import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Audit } from '../../../../core/decorators/audit.decorator';
import { RequirePermissions } from '../../../../core/decorators/require-permissions.decorator';
import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../core/guards/permissions.guard';

import { CreateDocumentDto } from '../../application/dto/create-document.dto';
import { UpdateDocumentDto } from '../../application/dto/update-document.dto';

import { CreateDocumentUseCase } from '../../application/use-cases/create-document.use-case';
import { GetDocumentByIdUseCase } from '../../application/use-cases/get-document-by-id.use-case';
import { GetDocumentsByPrescriptionUseCase } from '../../application/use-cases/get-documents-by-prescription.use-case';
import { GetDocumentsByWarehouseEntryUseCase } from '../../application/use-cases/get-documents-by-warehouse-entry.use-case';
import { GetDocumentsUseCase } from '../../application/use-cases/get-documents.use-case';
import { MarkDocumentOcrProcessedUseCase } from '../../application/use-cases/mark-document-ocr-processed.use-case';
import { MarkDocumentRejectedUseCase } from '../../application/use-cases/mark-document-rejected.use-case';
import { MarkDocumentValidatedUseCase } from '../../application/use-cases/mark-document-validated.use-case';
import { UpdateDocumentUseCase } from '../../application/use-cases/update-document.use-case';

@ApiTags('Documents')
@ApiBearerAuth()
@Controller('documents')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class DocumentsController {
  constructor(
    private readonly getDocumentsUseCase: GetDocumentsUseCase,
    private readonly getDocumentByIdUseCase: GetDocumentByIdUseCase,
    private readonly getDocumentsByWarehouseEntryUseCase: GetDocumentsByWarehouseEntryUseCase,
    private readonly getDocumentsByPrescriptionUseCase: GetDocumentsByPrescriptionUseCase,
    private readonly createDocumentUseCase: CreateDocumentUseCase,
    private readonly updateDocumentUseCase: UpdateDocumentUseCase,
    private readonly markDocumentOcrProcessedUseCase: MarkDocumentOcrProcessedUseCase,
    private readonly markDocumentValidatedUseCase: MarkDocumentValidatedUseCase,
    private readonly markDocumentRejectedUseCase: MarkDocumentRejectedUseCase,
  ) {}

  @Get()
  @RequirePermissions('documents.read')
  @Audit('Listar documentos')
  @ApiOperation({ summary: 'Listar documentos' })
  findAll() {
    return this.getDocumentsUseCase.execute();
  }

  @Get('warehouse-entry/:warehouseEntryId')
  @RequirePermissions('documents.read')
  @Audit('Listar documentos por ingreso de almacén')
  @ApiOperation({ summary: 'Listar documentos por ingreso de almacén' })
  findByWarehouseEntry(@Param('warehouseEntryId') warehouseEntryId: string) {
    return this.getDocumentsByWarehouseEntryUseCase.execute(warehouseEntryId);
  }

  @Get('prescription/:prescriptionId')
  @RequirePermissions('documents.read')
  @Audit('Listar documentos por receta')
  @ApiOperation({ summary: 'Listar documentos por receta' })
  findByPrescription(@Param('prescriptionId') prescriptionId: string) {
    return this.getDocumentsByPrescriptionUseCase.execute(prescriptionId);
  }

  @Get(':id')
  @RequirePermissions('documents.read')
  @Audit('Obtener documento')
  @ApiOperation({ summary: 'Obtener documento por ID' })
  findById(@Param('id') id: string) {
    return this.getDocumentByIdUseCase.execute(id);
  }

  @Post()
  @RequirePermissions('documents.create')
  @Audit('Crear documento')
  @ApiOperation({ summary: 'Crear documento' })
  create(@Body() dto: CreateDocumentDto) {
    return this.createDocumentUseCase.execute(dto);
  }

  @Patch(':id')
  @RequirePermissions('documents.update')
  @Audit('Editar documento')
  @ApiOperation({ summary: 'Editar documento' })
  update(@Param('id') id: string, @Body() dto: UpdateDocumentDto) {
    return this.updateDocumentUseCase.execute(id, dto);
  }

  @Patch(':id/ocr-processed')
  @RequirePermissions('documents.update-status')
  @Audit('Marcar documento como procesado por OCR')
  @ApiOperation({ summary: 'Marcar documento como procesado por OCR' })
  markOcrProcessed(@Param('id') id: string) {
    return this.markDocumentOcrProcessedUseCase.execute(id);
  }

  @Patch(':id/validated')
  @RequirePermissions('documents.update-status')
  @Audit('Marcar documento como validado')
  @ApiOperation({ summary: 'Marcar documento como validado' })
  markValidated(@Param('id') id: string) {
    return this.markDocumentValidatedUseCase.execute(id);
  }

  @Patch(':id/rejected')
  @RequirePermissions('documents.update-status')
  @Audit('Marcar documento como rechazado')
  @ApiOperation({ summary: 'Marcar documento como rechazado' })
  markRejected(@Param('id') id: string) {
    return this.markDocumentRejectedUseCase.execute(id);
  }
}
