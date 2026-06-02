import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Audit } from '../../../../core/decorators/audit.decorator';
import { RequirePermissions } from '../../../../core/decorators/require-permissions.decorator';
import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../core/guards/permissions.guard';

import { CreatePrescriptionDto } from '../../application/dto/create-prescription.dto';

import { CancelPrescriptionUseCase } from '../../application/use-cases/cancel-prescription.use-case';
import { CreatePrescriptionUseCase } from '../../application/use-cases/create-prescription.use-case';
import { GetPrescriptionByIdUseCase } from '../../application/use-cases/get-prescription-by-id.use-case';
import { GetPrescriptionsUseCase } from '../../application/use-cases/get-prescriptions.use-case';

@ApiTags('Prescriptions')
@ApiBearerAuth()
@Controller('prescriptions')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class PrescriptionsController {
  constructor(
    private readonly getPrescriptionsUseCase: GetPrescriptionsUseCase,
    private readonly getPrescriptionByIdUseCase: GetPrescriptionByIdUseCase,
    private readonly createPrescriptionUseCase: CreatePrescriptionUseCase,
    private readonly cancelPrescriptionUseCase: CancelPrescriptionUseCase,
  ) {}

  @Get()
  @RequirePermissions('prescriptions.read')
  @Audit('Listar recetas')
  @ApiOperation({ summary: 'Listar recetas' })
  findAll() {
    return this.getPrescriptionsUseCase.execute();
  }

  @Get(':id')
  @RequirePermissions('prescriptions.read')
  @Audit('Obtener receta')
  @ApiOperation({ summary: 'Obtener receta por ID' })
  findById(@Param('id') id: string) {
    return this.getPrescriptionByIdUseCase.execute(id);
  }

  @Post()
  @RequirePermissions('prescriptions.create')
  @Audit('Crear receta')
  @ApiOperation({ summary: 'Crear receta médica' })
  create(@Body() dto: CreatePrescriptionDto) {
    return this.createPrescriptionUseCase.execute(dto);
  }

  @Patch(':id/cancel')
  @RequirePermissions('prescriptions.cancel')
  @Audit('Cancelar receta')
  @ApiOperation({ summary: 'Cancelar receta médica' })
  cancel(@Param('id') id: string) {
    return this.cancelPrescriptionUseCase.execute(id);
  }
}
