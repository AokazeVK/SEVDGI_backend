import { Controller, Param, Post, UseGuards } from '@nestjs/common';

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Audit } from '../../../../core/decorators/audit.decorator';
import { RequirePermissions } from '../../../../core/decorators/require-permissions.decorator';

import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../core/guards/permissions.guard';

import { ProcessFieldExtractionUseCase } from '../../application/use-cases/process-field-extraction.use-case';

@ApiTags('Field Extraction')
@ApiBearerAuth()
@Controller('field-extraction')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class FieldExtractionController {
  constructor(private readonly processFieldExtractionUseCase: ProcessFieldExtractionUseCase) {}

  @Post('process/:ocrResultId')
  @RequirePermissions('field-extraction.process')
  @Audit('Procesar extracción de campos')
  @ApiOperation({
    summary: 'Extraer campos desde OCR',
  })
  process(@Param('ocrResultId') ocrResultId: string) {
    return this.processFieldExtractionUseCase.execute(ocrResultId);
  }
}
