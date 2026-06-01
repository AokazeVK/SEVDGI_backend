import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Audit } from '../../../../core/decorators/audit.decorator';
import { RequirePermissions } from '../../../../core/decorators/require-permissions.decorator';
import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../core/guards/permissions.guard';

import { CreatePharmacyReceptionDto } from '../../application/dto/create-pharmacy-reception.dto';

import { CreatePharmacyReceptionUseCase } from '../../application/use-cases/create-pharmacy-reception.use-case';
import { GetPharmacyReceptionByIdUseCase } from '../../application/use-cases/get-pharmacy-reception-by-id.use-case';
import { GetPharmacyReceptionsUseCase } from '../../application/use-cases/get-pharmacy-receptions.use-case';

@ApiTags('Pharmacy Receptions')
@ApiBearerAuth()
@Controller('pharmacy-receptions')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class PharmacyReceptionsController {
  constructor(
    private readonly getPharmacyReceptionsUseCase: GetPharmacyReceptionsUseCase,
    private readonly getPharmacyReceptionByIdUseCase: GetPharmacyReceptionByIdUseCase,
    private readonly createPharmacyReceptionUseCase: CreatePharmacyReceptionUseCase,
  ) {}

  @Get()
  @RequirePermissions('pharmacy-receptions.read')
  @Audit('Listar recepciones de farmacia')
  @ApiOperation({ summary: 'Listar recepciones de farmacia' })
  findAll() {
    return this.getPharmacyReceptionsUseCase.execute();
  }

  @Get(':id')
  @RequirePermissions('pharmacy-receptions.read')
  @Audit('Obtener recepción de farmacia')
  @ApiOperation({ summary: 'Obtener recepción de farmacia por ID' })
  findById(@Param('id') id: string) {
    return this.getPharmacyReceptionByIdUseCase.execute(id);
  }

  @Post()
  @RequirePermissions('pharmacy-receptions.create')
  @Audit('Registrar recepción de despacho en farmacia')
  @ApiOperation({ summary: 'Registrar recepción de despacho en farmacia' })
  create(@Body() dto: CreatePharmacyReceptionDto) {
    return this.createPharmacyReceptionUseCase.execute(dto);
  }
}
