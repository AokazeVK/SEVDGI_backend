import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Audit } from '../../../../core/decorators/audit.decorator';
import { RequirePermissions } from '../../../../core/decorators/require-permissions.decorator';
import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../core/guards/permissions.guard';

import { CreateSanitaryRegistrationDto } from '../../application/dto/create-sanitary-registration.dto';
import { UpdateSanitaryRegistrationDto } from '../../application/dto/update-sanitary-registration.dto';

import { CreateSanitaryRegistrationUseCase } from '../../application/use-cases/create-sanitary-registration.use-case';
import { GetSanitaryRegistrationByIdUseCase } from '../../application/use-cases/get-sanitary-registration-by-id.use-case';
import { GetSanitaryRegistrationsUseCase } from '../../application/use-cases/get-sanitary-registrations.use-case';
import { ToggleSanitaryRegistrationUseCase } from '../../application/use-cases/toggle-sanitary-registration.use-case';
import { UpdateSanitaryRegistrationUseCase } from '../../application/use-cases/update-sanitary-registration.use-case';

@ApiTags('Sanitary Registrations')
@ApiBearerAuth()
@Controller('sanitary-registrations')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class SanitaryRegistrationsController {
  constructor(
    private readonly getSanitaryRegistrationsUseCase: GetSanitaryRegistrationsUseCase,
    private readonly getSanitaryRegistrationByIdUseCase: GetSanitaryRegistrationByIdUseCase,
    private readonly createSanitaryRegistrationUseCase: CreateSanitaryRegistrationUseCase,
    private readonly updateSanitaryRegistrationUseCase: UpdateSanitaryRegistrationUseCase,
    private readonly toggleSanitaryRegistrationUseCase: ToggleSanitaryRegistrationUseCase,
  ) {}

  @Get()
  @RequirePermissions('sanitary-registrations.read')
  @Audit('Listar registros sanitarios')
  @ApiOperation({ summary: 'Listar registros sanitarios' })
  findAll() {
    return this.getSanitaryRegistrationsUseCase.execute();
  }

  @Get(':id')
  @RequirePermissions('sanitary-registrations.read')
  @Audit('Obtener registro sanitario')
  @ApiOperation({ summary: 'Obtener registro sanitario por ID' })
  findById(@Param('id') id: string) {
    return this.getSanitaryRegistrationByIdUseCase.execute(id);
  }

  @Post()
  @RequirePermissions('sanitary-registrations.create')
  @Audit('Crear registro sanitario')
  @ApiOperation({ summary: 'Crear registro sanitario' })
  create(@Body() dto: CreateSanitaryRegistrationDto) {
    return this.createSanitaryRegistrationUseCase.execute(dto);
  }

  @Patch(':id')
  @RequirePermissions('sanitary-registrations.update')
  @Audit('Editar registro sanitario')
  @ApiOperation({ summary: 'Editar registro sanitario' })
  update(@Param('id') id: string, @Body() dto: UpdateSanitaryRegistrationDto) {
    return this.updateSanitaryRegistrationUseCase.execute(id, dto);
  }

  @Patch(':id/toggle')
  @RequirePermissions('sanitary-registrations.toggle')
  @Audit('Activar/Inactivar registro sanitario')
  @ApiOperation({ summary: 'Activar/Inactivar registro sanitario' })
  toggle(@Param('id') id: string) {
    return this.toggleSanitaryRegistrationUseCase.execute(id);
  }
}
