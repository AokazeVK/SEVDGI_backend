import { Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Audit } from '../../../../core/decorators/audit.decorator';
import { RequirePermissions } from '../../../../core/decorators/require-permissions.decorator';
import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../core/guards/permissions.guard';

import { GenerateAlertsUseCase } from '../../application/use-cases/generate-alerts.use-case';
import { GetAlertByIdUseCase } from '../../application/use-cases/get-alert-by-id.use-case';
import { GetAlertsUseCase } from '../../application/use-cases/get-alerts.use-case';
import { GetPendingAlertsUseCase } from '../../application/use-cases/get-pending-alerts.use-case';
import { MarkAlertAsReadUseCase } from '../../application/use-cases/mark-alert-as-read.use-case';
import { ResolveAlertUseCase } from '../../application/use-cases/resolve-alert.use-case';

@ApiTags('Alerts')
@ApiBearerAuth()
@Controller('alerts')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class AlertsController {
  constructor(
    private readonly getAlertsUseCase: GetAlertsUseCase,
    private readonly getPendingAlertsUseCase: GetPendingAlertsUseCase,
    private readonly getAlertByIdUseCase: GetAlertByIdUseCase,
    private readonly generateAlertsUseCase: GenerateAlertsUseCase,
    private readonly markAlertAsReadUseCase: MarkAlertAsReadUseCase,
    private readonly resolveAlertUseCase: ResolveAlertUseCase,
  ) {}

  @Get()
  @RequirePermissions('alerts.read')
  @Audit('Listar alertas')
  @ApiOperation({ summary: 'Listar alertas' })
  findAll() {
    return this.getAlertsUseCase.execute();
  }

  @Get('pending')
  @RequirePermissions('alerts.read')
  @Audit('Listar alertas pendientes')
  @ApiOperation({ summary: 'Listar alertas pendientes' })
  findPending() {
    return this.getPendingAlertsUseCase.execute();
  }

  @Get(':id')
  @RequirePermissions('alerts.read')
  @Audit('Obtener alerta')
  @ApiOperation({ summary: 'Obtener alerta por ID' })
  findById(@Param('id') id: string) {
    return this.getAlertByIdUseCase.execute(id);
  }

  @Post('generate')
  @RequirePermissions('alerts.generate')
  @Audit('Generar alertas automáticas')
  @ApiOperation({ summary: 'Generar alertas automáticas' })
  generate() {
    return this.generateAlertsUseCase.execute();
  }

  @Patch(':id/read')
  @RequirePermissions('alerts.update-status')
  @Audit('Marcar alerta como leída')
  @ApiOperation({ summary: 'Marcar alerta como leída' })
  markAsRead(@Param('id') id: string) {
    return this.markAlertAsReadUseCase.execute(id);
  }

  @Patch(':id/resolve')
  @RequirePermissions('alerts.update-status')
  @Audit('Resolver alerta')
  @ApiOperation({ summary: 'Resolver alerta' })
  resolve(@Param('id') id: string) {
    return this.resolveAlertUseCase.execute(id);
  }
}
