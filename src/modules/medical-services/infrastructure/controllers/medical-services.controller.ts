import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Audit } from '../../../../core/decorators/audit.decorator';
import { RequirePermissions } from '../../../../core/decorators/require-permissions.decorator';
import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../core/guards/permissions.guard';

import { CreateMedicalServiceDto } from '../../application/dto/create-medical-service.dto';
import { UpdateMedicalServiceDto } from '../../application/dto/update-medical-service.dto';

import { CreateMedicalServiceUseCase } from '../../application/use-cases/create-medical-service.use-case';
import { GetMedicalServiceByIdUseCase } from '../../application/use-cases/get-medical-service-by-id.use-case';
import { GetMedicalServicesUseCase } from '../../application/use-cases/get-medical-services.use-case';
import { ToggleMedicalServiceUseCase } from '../../application/use-cases/toggle-medical-service.use-case';
import { UpdateMedicalServiceUseCase } from '../../application/use-cases/update-medical-service.use-case';

@ApiTags('Medical Services')
@ApiBearerAuth()
@Controller('medical-services')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class MedicalServicesController {
  constructor(
    private readonly getMedicalServicesUseCase: GetMedicalServicesUseCase,
    private readonly getMedicalServiceByIdUseCase: GetMedicalServiceByIdUseCase,
    private readonly createMedicalServiceUseCase: CreateMedicalServiceUseCase,
    private readonly updateMedicalServiceUseCase: UpdateMedicalServiceUseCase,
    private readonly toggleMedicalServiceUseCase: ToggleMedicalServiceUseCase,
  ) {}

  @Get()
  @RequirePermissions('medical-services.read')
  @Audit('Listar servicios médicos')
  @ApiOperation({ summary: 'Listar servicios médicos' })
  findAll() {
    return this.getMedicalServicesUseCase.execute();
  }

  @Get(':id')
  @RequirePermissions('medical-services.read')
  @Audit('Obtener servicio médico')
  @ApiOperation({ summary: 'Obtener servicio médico por ID' })
  findById(@Param('id') id: string) {
    return this.getMedicalServiceByIdUseCase.execute(id);
  }

  @Post()
  @RequirePermissions('medical-services.create')
  @Audit('Crear servicio médico')
  @ApiOperation({ summary: 'Crear servicio médico' })
  create(@Body() dto: CreateMedicalServiceDto) {
    return this.createMedicalServiceUseCase.execute(dto);
  }

  @Patch(':id')
  @RequirePermissions('medical-services.update')
  @Audit('Editar servicio médico')
  @ApiOperation({ summary: 'Editar servicio médico' })
  update(@Param('id') id: string, @Body() dto: UpdateMedicalServiceDto) {
    return this.updateMedicalServiceUseCase.execute(id, dto);
  }

  @Patch(':id/toggle')
  @RequirePermissions('medical-services.toggle')
  @Audit('Activar/Inactivar servicio médico')
  @ApiOperation({ summary: 'Activar/Inactivar servicio médico' })
  toggle(@Param('id') id: string) {
    return this.toggleMedicalServiceUseCase.execute(id);
  }
}
