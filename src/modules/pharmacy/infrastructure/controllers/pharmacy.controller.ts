import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Audit } from '../../../../core/decorators/audit.decorator';
import { RequirePermissions } from '../../../../core/decorators/require-permissions.decorator';
import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../core/guards/permissions.guard';

import { CreatePharmacyDto } from '../../application/dto/create-pharmacy.dto';
import { UpdatePharmacyDto } from '../../application/dto/update-pharmacy.dto';

import { CreatePharmacyUseCase } from '../../application/use-cases/create-pharmacy.use-case';
import { GetPharmacyByIdUseCase } from '../../application/use-cases/get-pharmacy-by-id.use-case';
import { GetPharmacyUseCase } from '../../application/use-cases/get-pharmacy.use-case';
import { TogglePharmacyUseCase } from '../../application/use-cases/toggle-pharmacy.use-case';
import { UpdatePharmacyUseCase } from '../../application/use-cases/update-pharmacy.use-case';

@ApiTags('Pharmacy')
@ApiBearerAuth()
@Controller('pharmacy')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class PharmacyController {
  constructor(
    private readonly getPharmacyUseCase: GetPharmacyUseCase,
    private readonly getPharmacyByIdUseCase: GetPharmacyByIdUseCase,
    private readonly createPharmacyUseCase: CreatePharmacyUseCase,
    private readonly updatePharmacyUseCase: UpdatePharmacyUseCase,
    private readonly togglePharmacyUseCase: TogglePharmacyUseCase,
  ) {}

  @Get()
  @RequirePermissions('pharmacy.read')
  @Audit('Listar farmacias')
  @ApiOperation({ summary: 'Listar farmacias' })
  findAll() {
    return this.getPharmacyUseCase.execute();
  }

  @Get(':id')
  @RequirePermissions('pharmacy.read')
  @Audit('Obtener farmacia')
  @ApiOperation({ summary: 'Obtener farmacia por ID' })
  findById(@Param('id') id: string) {
    return this.getPharmacyByIdUseCase.execute(id);
  }

  @Post()
  @RequirePermissions('pharmacy.create')
  @Audit('Crear farmacia')
  @ApiOperation({ summary: 'Crear farmacia' })
  create(@Body() dto: CreatePharmacyDto) {
    return this.createPharmacyUseCase.execute(dto);
  }

  @Patch(':id')
  @RequirePermissions('pharmacy.update')
  @Audit('Editar farmacia')
  @ApiOperation({ summary: 'Editar farmacia' })
  update(@Param('id') id: string, @Body() dto: UpdatePharmacyDto) {
    return this.updatePharmacyUseCase.execute(id, dto);
  }

  @Patch(':id/toggle')
  @RequirePermissions('pharmacy.toggle')
  @Audit('Activar/Inactivar farmacia')
  @ApiOperation({ summary: 'Activar/Inactivar farmacia' })
  toggle(@Param('id') id: string) {
    return this.togglePharmacyUseCase.execute(id);
  }
}
