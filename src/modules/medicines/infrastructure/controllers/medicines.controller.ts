import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../core/guards/permissions.guard';
import { RequirePermissions } from '../../../../core/decorators/require-permissions.decorator';
import { Audit } from '../../../../core/decorators/audit.decorator';

import { CreateMedicineDto } from '../../application/dto/create-medicine.dto';
import { UpdateMedicineDto } from '../../application/dto/update-medicine.dto';

import { GetMedicinesUseCase } from '../../application/use-cases/get-medicines.use-case';
import { GetMedicineByIdUseCase } from '../../application/use-cases/get-medicine-by-id.use-case';
import { CreateMedicineUseCase } from '../../application/use-cases/create-medicine.use-case';
import { UpdateMedicineUseCase } from '../../application/use-cases/update-medicine.use-case';
import { ToggleMedicineUseCase } from '../../application/use-cases/toggle-medicine.use-case';

@ApiTags('Medicines')
@ApiBearerAuth()
@Controller('medicines')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class MedicinesController {
  constructor(
    private readonly getMedicinesUseCase: GetMedicinesUseCase,
    private readonly getMedicineByIdUseCase: GetMedicineByIdUseCase,
    private readonly createMedicineUseCase: CreateMedicineUseCase,
    private readonly updateMedicineUseCase: UpdateMedicineUseCase,
    private readonly toggleMedicineUseCase: ToggleMedicineUseCase,
  ) {}

  @Get()
  @RequirePermissions('medicines.read')
  @Audit('Listar medicamentos')
  @ApiOperation({ summary: 'Listar medicamentos' })
  findAll() {
    return this.getMedicinesUseCase.execute();
  }

  @Get(':id')
  @RequirePermissions('medicines.read')
  @Audit('Obtener medicamento')
  @ApiOperation({ summary: 'Obtener medicamento por ID' })
  findById(@Param('id') id: string) {
    return this.getMedicineByIdUseCase.execute(id);
  }

  @Post()
  @RequirePermissions('medicines.create')
  @Audit('Crear medicamento')
  @ApiOperation({ summary: 'Crear medicamento' })
  create(@Body() dto: CreateMedicineDto) {
    return this.createMedicineUseCase.execute(dto);
  }

  @Patch(':id')
  @RequirePermissions('medicines.update')
  @Audit('Editar medicamento')
  @ApiOperation({ summary: 'Editar medicamento' })
  update(@Param('id') id: string, @Body() dto: UpdateMedicineDto) {
    return this.updateMedicineUseCase.execute(id, dto);
  }

  @Patch(':id/toggle')
  @RequirePermissions('medicines.toggle')
  @Audit('Activar/Inactivar medicamento')
  @ApiOperation({ summary: 'Activar/Inactivar medicamento' })
  toggle(@Param('id') id: string) {
    return this.toggleMedicineUseCase.execute(id);
  }
}
