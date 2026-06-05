import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Audit } from '../../../../core/decorators/audit.decorator';
import { RequirePermissions } from '../../../../core/decorators/require-permissions.decorator';
import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../core/guards/permissions.guard';

import { ProcessValidationUseCase } from '../../application/use-cases/process-validation.use-case';

@ApiTags('Inference Engine')
@ApiBearerAuth()
@Controller('inference-engine')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class InferenceEngineController {
  constructor(private readonly processValidationUseCase: ProcessValidationUseCase) {}

  @Post('process/:validationProcessId')
  @RequirePermissions('inference-engine.process')
  @Audit('Procesar validación con motor de inferencia')
  @ApiOperation({
    summary: 'Procesar validación con motor de inferencia',
  })
  process(@Param('validationProcessId') validationProcessId: string) {
    return this.processValidationUseCase.execute(validationProcessId);
  }
}
