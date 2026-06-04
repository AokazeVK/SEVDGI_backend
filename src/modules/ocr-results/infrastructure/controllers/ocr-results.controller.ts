import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Audit } from '../../../../core/decorators/audit.decorator';
import { RequirePermissions } from '../../../../core/decorators/require-permissions.decorator';
import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../core/guards/permissions.guard';

import { CreateOcrResultDto } from '../../application/dto/create-ocr-result.dto';

import { CreateOcrResultUseCase } from '../../application/use-cases/create-ocr-result.use-case';
import { GetOcrResultByIdUseCase } from '../../application/use-cases/get-ocr-result-by-id.use-case';
import { GetOcrResultsByDocumentUseCase } from '../../application/use-cases/get-ocr-results-by-document.use-case';
import { GetOcrResultsUseCase } from '../../application/use-cases/get-ocr-results.use-case';

@ApiTags('OCR Results')
@ApiBearerAuth()
@Controller('ocr-results')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class OcrResultsController {
  constructor(
    private readonly getOcrResultsUseCase: GetOcrResultsUseCase,
    private readonly getOcrResultByIdUseCase: GetOcrResultByIdUseCase,
    private readonly getOcrResultsByDocumentUseCase: GetOcrResultsByDocumentUseCase,
    private readonly createOcrResultUseCase: CreateOcrResultUseCase,
  ) {}

  @Get()
  @RequirePermissions('ocr-results.read')
  @Audit('Listar resultados OCR')
  @ApiOperation({ summary: 'Listar resultados OCR' })
  findAll() {
    return this.getOcrResultsUseCase.execute();
  }

  @Get('document/:documentId')
  @RequirePermissions('ocr-results.read')
  @Audit('Listar resultados OCR por documento')
  @ApiOperation({ summary: 'Listar resultados OCR por documento' })
  findByDocument(@Param('documentId') documentId: string) {
    return this.getOcrResultsByDocumentUseCase.execute(documentId);
  }

  @Get(':id')
  @RequirePermissions('ocr-results.read')
  @Audit('Obtener resultado OCR')
  @ApiOperation({ summary: 'Obtener resultado OCR por ID' })
  findById(@Param('id') id: string) {
    return this.getOcrResultByIdUseCase.execute(id);
  }

  @Post()
  @RequirePermissions('ocr-results.create')
  @Audit('Crear resultado OCR')
  @ApiOperation({ summary: 'Crear resultado OCR' })
  create(@Body() dto: CreateOcrResultDto) {
    return this.createOcrResultUseCase.execute(dto);
  }
}
