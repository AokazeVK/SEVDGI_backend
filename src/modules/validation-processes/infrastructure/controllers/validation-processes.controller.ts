import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Audit } from '../../../../core/decorators/audit.decorator';
import { RequirePermissions } from '../../../../core/decorators/require-permissions.decorator';
import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../core/guards/permissions.guard';

import { CreateValidationProcessDto } from '../../application/dto/create-validation-process.dto';
import { UpdateValidationProcessStatusDto } from '../../application/dto/update-validation-process-status.dto';

import { CreateValidationProcessUseCase } from '../../application/use-cases/create-validation-process.use-case';
import { GetValidationProcessByIdUseCase } from '../../application/use-cases/get-validation-process-by-id.use-case';
import { GetValidationProcessesByDocumentUseCase } from '../../application/use-cases/get-validation-processes-by-document.use-case';
import { GetValidationProcessesByWarehouseEntryUseCase } from '../../application/use-cases/get-validation-processes-by-warehouse-entry.use-case';
import { GetValidationProcessesUseCase } from '../../application/use-cases/get-validation-processes.use-case';
import { UpdateValidationProcessStatusUseCase } from '../../application/use-cases/update-validation-process-status.use-case';

@ApiTags('Validation Processes')
@ApiBearerAuth()
@Controller('validation-processes')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class ValidationProcessesController {
  constructor(
    private readonly getValidationProcessesUseCase: GetValidationProcessesUseCase,
    private readonly getValidationProcessByIdUseCase: GetValidationProcessByIdUseCase,
    private readonly getValidationProcessesByDocumentUseCase: GetValidationProcessesByDocumentUseCase,
    private readonly getValidationProcessesByWarehouseEntryUseCase: GetValidationProcessesByWarehouseEntryUseCase,
    private readonly createValidationProcessUseCase: CreateValidationProcessUseCase,
    private readonly updateValidationProcessStatusUseCase: UpdateValidationProcessStatusUseCase,
  ) {}

  @Get()
  @RequirePermissions('validation-processes.read')
  @Audit('Listar procesos de validación')
  @ApiOperation({ summary: 'Listar procesos de validación' })
  findAll() {
    return this.getValidationProcessesUseCase.execute();
  }

  @Get('document/:documentId')
  @RequirePermissions('validation-processes.read')
  @Audit('Listar procesos de validación por documento')
  @ApiOperation({ summary: 'Listar procesos de validación por documento' })
  findByDocument(@Param('documentId') documentId: string) {
    return this.getValidationProcessesByDocumentUseCase.execute(documentId);
  }

  @Get('warehouse-entry/:warehouseEntryId')
  @RequirePermissions('validation-processes.read')
  @Audit('Listar procesos de validación por ingreso de almacén')
  @ApiOperation({
    summary: 'Listar procesos de validación por ingreso de almacén',
  })
  findByWarehouseEntry(@Param('warehouseEntryId') warehouseEntryId: string) {
    return this.getValidationProcessesByWarehouseEntryUseCase.execute(warehouseEntryId);
  }

  @Get(':id')
  @RequirePermissions('validation-processes.read')
  @Audit('Obtener proceso de validación')
  @ApiOperation({ summary: 'Obtener proceso de validación por ID' })
  findById(@Param('id') id: string) {
    return this.getValidationProcessByIdUseCase.execute(id);
  }

  @Post()
  @RequirePermissions('validation-processes.create')
  @Audit('Crear proceso de validación')
  @ApiOperation({ summary: 'Crear proceso de validación' })
  create(@Body() dto: CreateValidationProcessDto) {
    return this.createValidationProcessUseCase.execute(dto);
  }

  @Patch(':id/status')
  @RequirePermissions('validation-processes.update-status')
  @Audit('Actualizar estado de proceso de validación')
  @ApiOperation({ summary: 'Actualizar estado de proceso de validación' })
  updateStatus(@Param('id') id: string, @Body() dto: UpdateValidationProcessStatusDto) {
    return this.updateValidationProcessStatusUseCase.execute(id, dto);
  }
}
