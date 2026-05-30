import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../core/guards/permissions.guard';
import { RequirePermissions } from '../../../../core/decorators/require-permissions.decorator';
import { Audit } from '../../../../core/decorators/audit.decorator';

import { CreateLaboratoryDto } from '../../application/dto/create-laboratory.dto';
import { UpdateLaboratoryDto } from '../../application/dto/update-laboratory.dto';

import { GetLaboratoriesUseCase } from '../../application/use-cases/get-laboratories.use-case';
import { GetLaboratoryByIdUseCase } from '../../application/use-cases/get-laboratory-by-id.use-case';
import { CreateLaboratoryUseCase } from '../../application/use-cases/create-laboratory.use-case';
import { UpdateLaboratoryUseCase } from '../../application/use-cases/update-laboratory.use-case';
import { ToggleLaboratoryUseCase } from '../../application/use-cases/toggle-laboratory.use-case';

@ApiTags('Laboratories')
@ApiBearerAuth()
@Controller('laboratories')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class LaboratoriesController {
  constructor(
    private readonly getLaboratoriesUseCase: GetLaboratoriesUseCase,
    private readonly getLaboratoryByIdUseCase: GetLaboratoryByIdUseCase,
    private readonly createLaboratoryUseCase: CreateLaboratoryUseCase,
    private readonly updateLaboratoryUseCase: UpdateLaboratoryUseCase,
    private readonly toggleLaboratoryUseCase: ToggleLaboratoryUseCase,
  ) {}

  @Get()
  @RequirePermissions('laboratories.read')
  @Audit('Listar laboratorios')
  @ApiOperation({ summary: 'Listar laboratorios' })
  findAll() {
    return this.getLaboratoriesUseCase.execute();
  }

  @Get(':id')
  @RequirePermissions('laboratories.read')
  @Audit('Obtener laboratorio')
  @ApiOperation({ summary: 'Obtener laboratorio por ID' })
  findById(@Param('id') id: string) {
    return this.getLaboratoryByIdUseCase.execute(id);
  }

  @Post()
  @RequirePermissions('laboratories.create')
  @Audit('Crear laboratorio')
  @ApiOperation({ summary: 'Crear laboratorio' })
  create(@Body() dto: CreateLaboratoryDto) {
    return this.createLaboratoryUseCase.execute(dto);
  }

  @Patch(':id')
  @RequirePermissions('laboratories.update')
  @Audit('Editar laboratorio')
  @ApiOperation({ summary: 'Editar laboratorio' })
  update(@Param('id') id: string, @Body() dto: UpdateLaboratoryDto) {
    return this.updateLaboratoryUseCase.execute(id, dto);
  }

  @Patch(':id/toggle')
  @RequirePermissions('laboratories.toggle')
  @Audit('Activar/Inactivar laboratorio')
  @ApiOperation({ summary: 'Activar/Inactivar laboratorio' })
  toggle(@Param('id') id: string) {
    return this.toggleLaboratoryUseCase.execute(id);
  }
}