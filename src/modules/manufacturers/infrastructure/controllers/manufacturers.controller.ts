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

import { CreateManufacturerDto } from '../../application/dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from '../../application/dto/update-manufacturer.dto';

import { GetManufacturersUseCase } from '../../application/use-cases/get-manufacturers.use-case';
import { GetManufacturerByIdUseCase } from '../../application/use-cases/get-manufacturer-by-id.use-case';
import { CreateManufacturerUseCase } from '../../application/use-cases/create-manufacturer.use-case';
import { UpdateManufacturerUseCase } from '../../application/use-cases/update-manufacturer.use-case';
import { ToggleManufacturerUseCase } from '../../application/use-cases/toggle-manufacturer.use-case';

@ApiTags('Manufacturers')
@ApiBearerAuth()
@Controller('manufacturers')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class ManufacturersController {
  constructor(
    private readonly getManufacturersUseCase: GetManufacturersUseCase,
    private readonly getManufacturerByIdUseCase: GetManufacturerByIdUseCase,
    private readonly createManufacturerUseCase: CreateManufacturerUseCase,
    private readonly updateManufacturerUseCase: UpdateManufacturerUseCase,
    private readonly toggleManufacturerUseCase: ToggleManufacturerUseCase,
  ) {}

  @Get()
  @RequirePermissions('manufacturers.read')
  @Audit('Listar fabricantes')
  @ApiOperation({ summary: 'Listar fabricantes' })
  findAll() {
    return this.getManufacturersUseCase.execute();
  }

  @Get(':id')
  @RequirePermissions('manufacturers.read')
  @Audit('Obtener fabricante')
  @ApiOperation({ summary: 'Obtener fabricante por ID' })
  findById(@Param('id') id: string) {
    return this.getManufacturerByIdUseCase.execute(id);
  }

  @Post()
  @RequirePermissions('manufacturers.create')
  @Audit('Crear fabricante')
  @ApiOperation({ summary: 'Crear fabricante' })
  create(@Body() dto: CreateManufacturerDto) {
    return this.createManufacturerUseCase.execute(dto);
  }

  @Patch(':id')
  @RequirePermissions('manufacturers.update')
  @Audit('Editar fabricante')
  @ApiOperation({ summary: 'Editar fabricante' })
  update(@Param('id') id: string, @Body() dto: UpdateManufacturerDto) {
    return this.updateManufacturerUseCase.execute(id, dto);
  }

  @Patch(':id/toggle')
  @RequirePermissions('manufacturers.toggle')
  @Audit('Activar/Inactivar fabricante')
  @ApiOperation({ summary: 'Activar/Inactivar fabricante' })
  toggle(@Param('id') id: string) {
    return this.toggleManufacturerUseCase.execute(id);
  }
}