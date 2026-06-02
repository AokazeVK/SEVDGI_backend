import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Audit } from '../../../../core/decorators/audit.decorator';
import { RequirePermissions } from '../../../../core/decorators/require-permissions.decorator';
import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../core/guards/permissions.guard';

import { CreatePatientDto } from '../../application/dto/create-patient.dto';
import { UpdatePatientDto } from '../../application/dto/update-patient.dto';

import { CreatePatientUseCase } from '../../application/use-cases/create-patient.use-case';
import { GetPatientByIdUseCase } from '../../application/use-cases/get-patient-by-id.use-case';
import { GetPatientsUseCase } from '../../application/use-cases/get-patients.use-case';
import { TogglePatientUseCase } from '../../application/use-cases/toggle-patient.use-case';
import { UpdatePatientUseCase } from '../../application/use-cases/update-patient.use-case';

@ApiTags('Patients')
@ApiBearerAuth()
@Controller('patients')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class PatientsController {
  constructor(
    private readonly getPatientsUseCase: GetPatientsUseCase,
    private readonly getPatientByIdUseCase: GetPatientByIdUseCase,
    private readonly createPatientUseCase: CreatePatientUseCase,
    private readonly updatePatientUseCase: UpdatePatientUseCase,
    private readonly togglePatientUseCase: TogglePatientUseCase,
  ) {}

  @Get()
  @RequirePermissions('patients.read')
  @Audit('Listar pacientes')
  @ApiOperation({ summary: 'Listar pacientes' })
  findAll() {
    return this.getPatientsUseCase.execute();
  }

  @Get(':id')
  @RequirePermissions('patients.read')
  @Audit('Obtener paciente')
  @ApiOperation({ summary: 'Obtener paciente por ID' })
  findById(@Param('id') id: string) {
    return this.getPatientByIdUseCase.execute(id);
  }

  @Post()
  @RequirePermissions('patients.create')
  @Audit('Crear paciente')
  @ApiOperation({ summary: 'Crear paciente' })
  create(@Body() dto: CreatePatientDto) {
    return this.createPatientUseCase.execute(dto);
  }

  @Patch(':id')
  @RequirePermissions('patients.update')
  @Audit('Editar paciente')
  @ApiOperation({ summary: 'Editar paciente' })
  update(@Param('id') id: string, @Body() dto: UpdatePatientDto) {
    return this.updatePatientUseCase.execute(id, dto);
  }

  @Patch(':id/toggle')
  @RequirePermissions('patients.toggle')
  @Audit('Activar/Inactivar paciente')
  @ApiOperation({ summary: 'Activar/Inactivar paciente' })
  toggle(@Param('id') id: string) {
    return this.togglePatientUseCase.execute(id);
  }
}
