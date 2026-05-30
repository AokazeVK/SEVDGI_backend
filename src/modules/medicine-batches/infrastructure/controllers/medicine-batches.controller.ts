import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../core/guards/permissions.guard';
import { RequirePermissions } from '../../../../core/decorators/require-permissions.decorator';
import { Audit } from '../../../../core/decorators/audit.decorator';

import { CreateMedicineBatchDto } from '../../application/dto/create-medicine-batch.dto';
import { UpdateMedicineBatchDto } from '../../application/dto/update-medicine-batch.dto';

import { GetMedicineBatchesUseCase } from '../../application/use-cases/get-medicine-batches.use-case';
import { GetMedicineBatchByIdUseCase } from '../../application/use-cases/get-medicine-batch-by-id.use-case';
import { CreateMedicineBatchUseCase } from '../../application/use-cases/create-medicine-batch.use-case';
import { UpdateMedicineBatchUseCase } from '../../application/use-cases/update-medicine-batch.use-case';
import { ToggleMedicineBatchUseCase } from '../../application/use-cases/toggle-medicine-batch.use-case';

@ApiTags('Medicine Batches')
@ApiBearerAuth()
@Controller('medicine-batches')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class MedicineBatchesController {
  constructor(
    private readonly getMedicineBatchesUseCase: GetMedicineBatchesUseCase,
    private readonly getMedicineBatchByIdUseCase: GetMedicineBatchByIdUseCase,
    private readonly createMedicineBatchUseCase: CreateMedicineBatchUseCase,
    private readonly updateMedicineBatchUseCase: UpdateMedicineBatchUseCase,
    private readonly toggleMedicineBatchUseCase: ToggleMedicineBatchUseCase,
  ) {}

  @Get()
  @RequirePermissions('medicine-batches.read')
  @Audit('Listar lotes de medicamentos')
  @ApiOperation({ summary: 'Listar lotes de medicamentos' })
  findAll() {
    return this.getMedicineBatchesUseCase.execute();
  }

  @Get(':id')
  @RequirePermissions('medicine-batches.read')
  @Audit('Obtener lote de medicamento')
  @ApiOperation({ summary: 'Obtener lote de medicamento por ID' })
  findById(@Param('id') id: string) {
    return this.getMedicineBatchByIdUseCase.execute(id);
  }

  @Post()
  @RequirePermissions('medicine-batches.create')
  @Audit('Crear lote de medicamento')
  @ApiOperation({ summary: 'Crear lote de medicamento' })
  create(@Body() dto: CreateMedicineBatchDto) {
    return this.createMedicineBatchUseCase.execute(dto);
  }

  @Patch(':id')
  @RequirePermissions('medicine-batches.update')
  @Audit('Editar lote de medicamento')
  @ApiOperation({ summary: 'Editar lote de medicamento' })
  update(@Param('id') id: string, @Body() dto: UpdateMedicineBatchDto) {
    return this.updateMedicineBatchUseCase.execute(id, dto);
  }

  @Patch(':id/toggle')
  @RequirePermissions('medicine-batches.toggle')
  @Audit('Activar/Inactivar lote de medicamento')
  @ApiOperation({ summary: 'Activar/Inactivar lote de medicamento' })
  toggle(@Param('id') id: string) {
    return this.toggleMedicineBatchUseCase.execute(id);
  }
}
