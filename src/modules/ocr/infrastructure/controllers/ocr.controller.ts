import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Audit } from '../../../../core/decorators/audit.decorator';
import { RequirePermissions } from '../../../../core/decorators/require-permissions.decorator';
import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../core/guards/permissions.guard';

import { ProcessDocumentOcrUseCase } from '../../application/use-cases/process-document-ocr.use-case';

@ApiTags('OCR')
@ApiBearerAuth()
@Controller('ocr')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class OcrController {
  constructor(private readonly processDocumentOcrUseCase: ProcessDocumentOcrUseCase) {}

  @Post('process/:documentId')
  @RequirePermissions('ocr.process')
  @Audit('Procesar documento con OCR')
  @ApiOperation({ summary: 'Procesar documento con OCR' })
  process(@Param('documentId') documentId: string) {
    return this.processDocumentOcrUseCase.execute(documentId);
  }
}
