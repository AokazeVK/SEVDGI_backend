import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Audit } from '../../../../core/decorators/audit.decorator';
import { RequirePermissions } from '../../../../core/decorators/require-permissions.decorator';
import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../core/guards/permissions.guard';

import { CreatePharmacyDispensationDto } from '../../application/dto/create-pharmacy-dispensation.dto';

import { CreatePharmacyDispensationUseCase } from '../../application/use-cases/create-pharmacy-dispensation.use-case';
import { GetPharmacyDispensationByIdUseCase } from '../../application/use-cases/get-pharmacy-dispensation-by-id.use-case';
import { GetPharmacyDispensationsUseCase } from '../../application/use-cases/get-pharmacy-dispensations.use-case';

@ApiTags('Pharmacy Dispensations')
@ApiBearerAuth()
@Controller('pharmacy-dispensations')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class PharmacyDispensationsController {
  constructor(
    private readonly getPharmacyDispensationsUseCase: GetPharmacyDispensationsUseCase,
    private readonly getPharmacyDispensationByIdUseCase: GetPharmacyDispensationByIdUseCase,
    private readonly createPharmacyDispensationUseCase: CreatePharmacyDispensationUseCase,
  ) {}

  @Get()
  @RequirePermissions('pharmacy-dispensations.read')
  @Audit('Listar dispensaciones')
  @ApiOperation({ summary: 'Listar dispensaciones de farmacia' })
  findAll() {
    return this.getPharmacyDispensationsUseCase.execute();
  }

  @Get(':id')
  @RequirePermissions('pharmacy-dispensations.read')
  @Audit('Obtener dispensación')
  @ApiOperation({ summary: 'Obtener dispensación por ID' })
  findById(@Param('id') id: string) {
    return this.getPharmacyDispensationByIdUseCase.execute(id);
  }

  @Post()
  @RequirePermissions('pharmacy-dispensations.create')
  @Audit('Crear dispensación')
  @ApiOperation({ summary: 'Crear dispensación usando FEFO' })
  create(@Body() dto: CreatePharmacyDispensationDto) {
    return this.createPharmacyDispensationUseCase.execute(dto);
  }
}
