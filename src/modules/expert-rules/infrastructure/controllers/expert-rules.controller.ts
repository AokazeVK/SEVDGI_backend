import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Audit } from '../../../../core/decorators/audit.decorator';
import { RequirePermissions } from '../../../../core/decorators/require-permissions.decorator';
import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../core/guards/permissions.guard';

import { CreateExpertRuleDto } from '../../application/dto/create-expert-rule.dto';
import { UpdateExpertRuleDto } from '../../application/dto/update-expert-rule.dto';

import { CreateExpertRuleUseCase } from '../../application/use-cases/create-expert-rule.use-case';
import { GetExpertRuleByIdUseCase } from '../../application/use-cases/get-expert-rule-by-id.use-case';
import { GetExpertRulesUseCase } from '../../application/use-cases/get-expert-rules.use-case';
import { ToggleExpertRuleUseCase } from '../../application/use-cases/toggle-expert-rule.use-case';
import { UpdateExpertRuleUseCase } from '../../application/use-cases/update-expert-rule.use-case';

@ApiTags('Expert Rules')
@ApiBearerAuth()
@Controller('expert-rules')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class ExpertRulesController {
  constructor(
    private readonly getExpertRulesUseCase: GetExpertRulesUseCase,
    private readonly getExpertRuleByIdUseCase: GetExpertRuleByIdUseCase,
    private readonly createExpertRuleUseCase: CreateExpertRuleUseCase,
    private readonly updateExpertRuleUseCase: UpdateExpertRuleUseCase,
    private readonly toggleExpertRuleUseCase: ToggleExpertRuleUseCase,
  ) {}

  @Get()
  @RequirePermissions('expert-rules.read')
  @Audit('Listar reglas expertas')
  @ApiOperation({ summary: 'Listar reglas expertas' })
  findAll() {
    return this.getExpertRulesUseCase.execute();
  }

  @Get(':id')
  @RequirePermissions('expert-rules.read')
  @Audit('Obtener regla experta')
  @ApiOperation({ summary: 'Obtener regla experta por ID' })
  findById(@Param('id') id: string) {
    return this.getExpertRuleByIdUseCase.execute(id);
  }

  @Post()
  @RequirePermissions('expert-rules.create')
  @Audit('Crear regla experta')
  @ApiOperation({ summary: 'Crear regla experta' })
  create(@Body() dto: CreateExpertRuleDto) {
    return this.createExpertRuleUseCase.execute(dto);
  }

  @Patch(':id')
  @RequirePermissions('expert-rules.update')
  @Audit('Editar regla experta')
  @ApiOperation({ summary: 'Editar regla experta' })
  update(@Param('id') id: string, @Body() dto: UpdateExpertRuleDto) {
    return this.updateExpertRuleUseCase.execute(id, dto);
  }

  @Patch(':id/toggle')
  @RequirePermissions('expert-rules.toggle')
  @Audit('Activar/Inactivar regla experta')
  @ApiOperation({ summary: 'Activar/Inactivar regla experta' })
  toggle(@Param('id') id: string) {
    return this.toggleExpertRuleUseCase.execute(id);
  }
}
