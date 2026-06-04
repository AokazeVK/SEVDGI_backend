import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Audit } from '../../../../core/decorators/audit.decorator';
import { RequirePermissions } from '../../../../core/decorators/require-permissions.decorator';
import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../core/guards/permissions.guard';

import { CreateOcrExtractedFieldDto } from '../../application/dto/create-ocr-extracted-field.dto';

import { CreateOcrExtractedFieldUseCase } from '../../application/use-cases/create-ocr-extracted-field.use-case';
import { GetOcrExtractedFieldByIdUseCase } from '../../application/use-cases/get-ocr-extracted-field-by-id.use-case';
import { GetOcrExtractedFieldsByOcrResultUseCase } from '../../application/use-cases/get-ocr-extracted-fields-by-ocr-result.use-case';
import { GetOcrExtractedFieldsUseCase } from '../../application/use-cases/get-ocr-extracted-fields.use-case';

@ApiTags('OCR Extracted Fields')
@ApiBearerAuth()
@Controller('ocr-extracted-fields')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class OcrExtractedFieldsController {
  constructor(
    private readonly getOcrExtractedFieldsUseCase: GetOcrExtractedFieldsUseCase,
    private readonly getOcrExtractedFieldByIdUseCase: GetOcrExtractedFieldByIdUseCase,
    private readonly getOcrExtractedFieldsByOcrResultUseCase: GetOcrExtractedFieldsByOcrResultUseCase,
    private readonly createOcrExtractedFieldUseCase: CreateOcrExtractedFieldUseCase,
  ) {}

  @Get()
  @RequirePermissions('ocr-extracted-fields.read')
  @Audit('Listar campos extraídos por OCR')
  @ApiOperation({ summary: 'Listar campos extraídos por OCR' })
  findAll() {
    return this.getOcrExtractedFieldsUseCase.execute();
  }

  @Get('ocr-result/:ocrResultId')
  @RequirePermissions('ocr-extracted-fields.read')
  @Audit('Listar campos extraídos por resultado OCR')
  @ApiOperation({ summary: 'Listar campos extraídos por resultado OCR' })
  findByOcrResult(@Param('ocrResultId') ocrResultId: string) {
    return this.getOcrExtractedFieldsByOcrResultUseCase.execute(ocrResultId);
  }

  @Get(':id')
  @RequirePermissions('ocr-extracted-fields.read')
  @Audit('Obtener campo extraído por OCR')
  @ApiOperation({ summary: 'Obtener campo extraído por OCR por ID' })
  findById(@Param('id') id: string) {
    return this.getOcrExtractedFieldByIdUseCase.execute(id);
  }

  @Post()
  @RequirePermissions('ocr-extracted-fields.create')
  @Audit('Crear campo extraído por OCR')
  @ApiOperation({ summary: 'Crear campo extraído por OCR' })
  create(@Body() dto: CreateOcrExtractedFieldDto) {
    return this.createOcrExtractedFieldUseCase.execute(dto);
  }
}
