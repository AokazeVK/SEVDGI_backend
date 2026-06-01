import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Audit } from '../../../../core/decorators/audit.decorator';
import { RequirePermissions } from '../../../../core/decorators/require-permissions.decorator';
import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../core/guards/permissions.guard';

import { CreateRequestDto } from '../../application/dto/create-request.dto';

import { ApproveRequestUseCase } from '../../application/use-cases/approve-request.use-case';
import { CancelRequestUseCase } from '../../application/use-cases/cancel-request.use-case';
import { CreateRequestUseCase } from '../../application/use-cases/create-request.use-case';
import { GetRequestByIdUseCase } from '../../application/use-cases/get-request-by-id.use-case';
import { GetRequestsUseCase } from '../../application/use-cases/get-requests.use-case';
import { RejectRequestUseCase } from '../../application/use-cases/reject-request.use-case';

@ApiTags('Requests')
@ApiBearerAuth()
@Controller('requests')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class RequestsController {
  constructor(
    private readonly getRequestsUseCase: GetRequestsUseCase,
    private readonly getRequestByIdUseCase: GetRequestByIdUseCase,
    private readonly createRequestUseCase: CreateRequestUseCase,
    private readonly approveRequestUseCase: ApproveRequestUseCase,
    private readonly rejectRequestUseCase: RejectRequestUseCase,
    private readonly cancelRequestUseCase: CancelRequestUseCase,
  ) {}

  @Get()
  @RequirePermissions('requests.read')
  @Audit('Listar solicitudes')
  @ApiOperation({ summary: 'Listar solicitudes' })
  findAll() {
    return this.getRequestsUseCase.execute();
  }

  @Get(':id')
  @RequirePermissions('requests.read')
  @Audit('Obtener solicitud')
  @ApiOperation({ summary: 'Obtener solicitud por ID' })
  findById(@Param('id') id: string) {
    return this.getRequestByIdUseCase.execute(id);
  }

  @Post()
  @RequirePermissions('requests.create')
  @Audit('Crear solicitud')
  @ApiOperation({ summary: 'Crear solicitud de farmacia' })
  create(@Body() dto: CreateRequestDto) {
    return this.createRequestUseCase.execute(dto);
  }

  @Patch(':id/approve')
  @RequirePermissions('requests.approve')
  @Audit('Aprobar solicitud')
  @ApiOperation({ summary: 'Aprobar solicitud' })
  approve(@Param('id') id: string) {
    return this.approveRequestUseCase.execute(id);
  }

  @Patch(':id/reject')
  @RequirePermissions('requests.reject')
  @Audit('Rechazar solicitud')
  @ApiOperation({ summary: 'Rechazar solicitud' })
  reject(@Param('id') id: string) {
    return this.rejectRequestUseCase.execute(id);
  }

  @Patch(':id/cancel')
  @RequirePermissions('requests.cancel')
  @Audit('Cancelar solicitud')
  @ApiOperation({ summary: 'Cancelar solicitud' })
  cancel(@Param('id') id: string) {
    return this.cancelRequestUseCase.execute(id);
  }
}
