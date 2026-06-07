import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Audit } from '../../../../core/decorators/audit.decorator';
import { RequirePermissions } from '../../../../core/decorators/require-permissions.decorator';
import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../core/guards/permissions.guard';

import { GetValidationResultByIdUseCase } from '../../application/use-cases/get-validation-result-by-id.use-case';
import { GetValidationResultsByProcessUseCase } from '../../application/use-cases/get-validation-results-by-process.use-case';
import { GetValidationResultsUseCase } from '../../application/use-cases/get-validation-results.use-case';

@ApiTags('Validation Results')
@ApiBearerAuth()
@Controller('validation-results')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class ValidationResultsController {
  constructor(
    private readonly getValidationResultsUseCase: GetValidationResultsUseCase,
    private readonly getValidationResultByIdUseCase: GetValidationResultByIdUseCase,
    private readonly getValidationResultsByProcessUseCase: GetValidationResultsByProcessUseCase,
  ) {}

  @Get()
  @RequirePermissions('validation-results.read')
  @Audit('Listar resultados de validación')
  @ApiOperation({ summary: 'Listar resultados de validación' })
  findAll() {
    return this.getValidationResultsUseCase.execute();
  }

  @Get('process/:processId')
  @RequirePermissions('validation-results.read')
  @Audit('Listar resultados por proceso de validación')
  @ApiOperation({ summary: 'Listar resultados por proceso de validación' })
  findByProcess(@Param('processId') processId: string) {
    return this.getValidationResultsByProcessUseCase.execute(processId);
  }

  @Get(':id')
  @RequirePermissions('validation-results.read')
  @Audit('Obtener resultado de validación')
  @ApiOperation({ summary: 'Obtener resultado de validación por ID' })
  findById(@Param('id') id: string) {
    return this.getValidationResultByIdUseCase.execute(id);
  }
}
