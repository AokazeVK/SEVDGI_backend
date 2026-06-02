import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Audit } from '../../../../core/decorators/audit.decorator';
import { RequirePermissions } from '../../../../core/decorators/require-permissions.decorator';
import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../core/guards/permissions.guard';

import { CreateDoctorDto } from '../../application/dto/create-doctor.dto';
import { UpdateDoctorDto } from '../../application/dto/update-doctor.dto';

import { CreateDoctorUseCase } from '../../application/use-cases/create-doctor.use-case';
import { GetDoctorByIdUseCase } from '../../application/use-cases/get-doctor-by-id.use-case';
import { GetDoctorsUseCase } from '../../application/use-cases/get-doctors.use-case';
import { ToggleDoctorUseCase } from '../../application/use-cases/toggle-doctor.use-case';
import { UpdateDoctorUseCase } from '../../application/use-cases/update-doctor.use-case';

@ApiTags('Doctors')
@ApiBearerAuth()
@Controller('doctors')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class DoctorsController {
  constructor(
    private readonly getDoctorsUseCase: GetDoctorsUseCase,
    private readonly getDoctorByIdUseCase: GetDoctorByIdUseCase,
    private readonly createDoctorUseCase: CreateDoctorUseCase,
    private readonly updateDoctorUseCase: UpdateDoctorUseCase,
    private readonly toggleDoctorUseCase: ToggleDoctorUseCase,
  ) {}

  @Get()
  @RequirePermissions('doctors.read')
  @Audit('Listar médicos')
  @ApiOperation({ summary: 'Listar médicos' })
  findAll() {
    return this.getDoctorsUseCase.execute();
  }

  @Get(':id')
  @RequirePermissions('doctors.read')
  @Audit('Obtener médico')
  @ApiOperation({ summary: 'Obtener médico por ID' })
  findById(@Param('id') id: string) {
    return this.getDoctorByIdUseCase.execute(id);
  }

  @Post()
  @RequirePermissions('doctors.create')
  @Audit('Crear médico')
  @ApiOperation({ summary: 'Crear médico' })
  create(@Body() dto: CreateDoctorDto) {
    return this.createDoctorUseCase.execute(dto);
  }

  @Patch(':id')
  @RequirePermissions('doctors.update')
  @Audit('Editar médico')
  @ApiOperation({ summary: 'Editar médico' })
  update(@Param('id') id: string, @Body() dto: UpdateDoctorDto) {
    return this.updateDoctorUseCase.execute(id, dto);
  }

  @Patch(':id/toggle')
  @RequirePermissions('doctors.toggle')
  @Audit('Activar/Inactivar médico')
  @ApiOperation({ summary: 'Activar/Inactivar médico' })
  toggle(@Param('id') id: string) {
    return this.toggleDoctorUseCase.execute(id);
  }
}
