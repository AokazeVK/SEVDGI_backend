import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../core/guards/permissions.guard';
import { RequirePermissions } from '../../../../core/decorators/require-permissions.decorator';
import { Audit } from '../../../../core/decorators/audit.decorator';

import { CreatePharmaceuticalFormDto } from '../../application/dto/create-pharmaceutical-form.dto';
import { UpdatePharmaceuticalFormDto } from '../../application/dto/update-pharmaceutical-form.dto';

import { GetPharmaceuticalFormsUseCase } from '../../application/use-cases/get-pharmaceutical-forms.use-case';
import { GetPharmaceuticalFormByIdUseCase } from '../../application/use-cases/get-pharmaceutical-form-by-id.use-case';
import { CreatePharmaceuticalFormUseCase } from '../../application/use-cases/create-pharmaceutical-form.use-case';
import { UpdatePharmaceuticalFormUseCase } from '../../application/use-cases/update-pharmaceutical-form.use-case';
import { TogglePharmaceuticalFormUseCase } from '../../application/use-cases/toggle-pharmaceutical-form.use-case';

@ApiTags('Pharmaceutical Forms')
@ApiBearerAuth()
@Controller('pharmaceutical-forms')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class PharmaceuticalFormsController {
  constructor(
    private readonly getPharmaceuticalFormsUseCase: GetPharmaceuticalFormsUseCase,
    private readonly getPharmaceuticalFormByIdUseCase: GetPharmaceuticalFormByIdUseCase,
    private readonly createPharmaceuticalFormUseCase: CreatePharmaceuticalFormUseCase,
    private readonly updatePharmaceuticalFormUseCase: UpdatePharmaceuticalFormUseCase,
    private readonly togglePharmaceuticalFormUseCase: TogglePharmaceuticalFormUseCase,
  ) {}

  @Get()
  @RequirePermissions('pharmaceutical-forms.read')
  @Audit('Listar formas farmacéuticas')
  @ApiOperation({ summary: 'Listar formas farmacéuticas' })
  findAll() {
    return this.getPharmaceuticalFormsUseCase.execute();
  }

  @Get(':id')
  @RequirePermissions('pharmaceutical-forms.read')
  @Audit('Obtener forma farmacéutica')
  @ApiOperation({ summary: 'Obtener forma farmacéutica por ID' })
  findById(@Param('id') id: string) {
    return this.getPharmaceuticalFormByIdUseCase.execute(id);
  }

  @Post()
  @RequirePermissions('pharmaceutical-forms.create')
  @Audit('Crear forma farmacéutica')
  @ApiOperation({ summary: 'Crear forma farmacéutica' })
  create(@Body() dto: CreatePharmaceuticalFormDto) {
    return this.createPharmaceuticalFormUseCase.execute(dto);
  }

  @Patch(':id')
  @RequirePermissions('pharmaceutical-forms.update')
  @Audit('Editar forma farmacéutica')
  @ApiOperation({ summary: 'Editar forma farmacéutica' })
  update(@Param('id') id: string, @Body() dto: UpdatePharmaceuticalFormDto) {
    return this.updatePharmaceuticalFormUseCase.execute(id, dto);
  }

  @Patch(':id/toggle')
  @RequirePermissions('pharmaceutical-forms.toggle')
  @Audit('Activar/Inactivar forma farmacéutica')
  @ApiOperation({ summary: 'Activar/Inactivar forma farmacéutica' })
  toggle(@Param('id') id: string) {
    return this.togglePharmaceuticalFormUseCase.execute(id);
  }
}
