import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Audit } from '../../../../core/decorators/audit.decorator';
import { RequirePermissions } from '../../../../core/decorators/require-permissions.decorator';
import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../core/guards/permissions.guard';

import { CreateDispatchDto } from '../../application/dto/create-dispatch.dto';

import { CancelDispatchUseCase } from '../../application/use-cases/cancel-dispatch.use-case';
import { CreateDispatchUseCase } from '../../application/use-cases/create-dispatch.use-case';
import { GetDispatchByIdUseCase } from '../../application/use-cases/get-dispatch-by-id.use-case';
import { GetDispatchesUseCase } from '../../application/use-cases/get-dispatches.use-case';

@ApiTags('Dispatches')
@ApiBearerAuth()
@Controller('dispatches')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class DispatchesController {
  constructor(
    private readonly getDispatchesUseCase: GetDispatchesUseCase,
    private readonly getDispatchByIdUseCase: GetDispatchByIdUseCase,
    private readonly createDispatchUseCase: CreateDispatchUseCase,
    private readonly cancelDispatchUseCase: CancelDispatchUseCase,
  ) {}

  @Get()
  @RequirePermissions('dispatches.read')
  @Audit('Listar despachos')
  @ApiOperation({ summary: 'Listar despachos' })
  findAll() {
    return this.getDispatchesUseCase.execute();
  }

  @Get(':id')
  @RequirePermissions('dispatches.read')
  @Audit('Obtener despacho')
  @ApiOperation({ summary: 'Obtener despacho por ID' })
  findById(@Param('id') id: string) {
    return this.getDispatchByIdUseCase.execute(id);
  }

  @Post()
  @RequirePermissions('dispatches.create')
  @Audit('Crear despacho FEFO')
  @ApiOperation({ summary: 'Crear despacho usando FEFO' })
  create(@Body() dto: CreateDispatchDto) {
    return this.createDispatchUseCase.execute(dto);
  }

  @Patch(':id/cancel')
  @RequirePermissions('dispatches.cancel')
  @Audit('Cancelar despacho')
  @ApiOperation({ summary: 'Cancelar despacho' })
  cancel(@Param('id') id: string) {
    return this.cancelDispatchUseCase.execute(id);
  }
}
