import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Audit } from '../../../../core/decorators/audit.decorator';
import { RequirePermissions } from '../../../../core/decorators/require-permissions.decorator';
import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../core/guards/permissions.guard';

import { CreateDocumentTypeDto } from '../../application/dto/create-document-type.dto';
import { UpdateDocumentTypeDto } from '../../application/dto/update-document-type.dto';

import { CreateDocumentTypeUseCase } from '../../application/use-cases/create-document-type.use-case';
import { GetDocumentTypeByIdUseCase } from '../../application/use-cases/get-document-type-by-id.use-case';
import { GetDocumentTypesUseCase } from '../../application/use-cases/get-document-types.use-case';
import { ToggleDocumentTypeUseCase } from '../../application/use-cases/toggle-document-type.use-case';
import { UpdateDocumentTypeUseCase } from '../../application/use-cases/update-document-type.use-case';

@ApiTags('Document Types')
@ApiBearerAuth()
@Controller('document-types')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class DocumentTypesController {
  constructor(
    private readonly getDocumentTypesUseCase: GetDocumentTypesUseCase,
    private readonly getDocumentTypeByIdUseCase: GetDocumentTypeByIdUseCase,
    private readonly createDocumentTypeUseCase: CreateDocumentTypeUseCase,
    private readonly updateDocumentTypeUseCase: UpdateDocumentTypeUseCase,
    private readonly toggleDocumentTypeUseCase: ToggleDocumentTypeUseCase,
  ) {}

  @Get()
  @RequirePermissions('document-types.read')
  @Audit('Listar tipos de documento')
  @ApiOperation({ summary: 'Listar tipos de documento' })
  findAll() {
    return this.getDocumentTypesUseCase.execute();
  }

  @Get(':id')
  @RequirePermissions('document-types.read')
  @Audit('Obtener tipo de documento')
  @ApiOperation({ summary: 'Obtener tipo de documento por ID' })
  findById(@Param('id') id: string) {
    return this.getDocumentTypeByIdUseCase.execute(id);
  }

  @Post()
  @RequirePermissions('document-types.create')
  @Audit('Crear tipo de documento')
  @ApiOperation({ summary: 'Crear tipo de documento' })
  create(@Body() dto: CreateDocumentTypeDto) {
    return this.createDocumentTypeUseCase.execute(dto);
  }

  @Patch(':id')
  @RequirePermissions('document-types.update')
  @Audit('Editar tipo de documento')
  @ApiOperation({ summary: 'Editar tipo de documento' })
  update(@Param('id') id: string, @Body() dto: UpdateDocumentTypeDto) {
    return this.updateDocumentTypeUseCase.execute(id, dto);
  }

  @Patch(':id/toggle')
  @RequirePermissions('document-types.toggle')
  @Audit('Activar/Inactivar tipo de documento')
  @ApiOperation({ summary: 'Activar/Inactivar tipo de documento' })
  toggle(@Param('id') id: string) {
    return this.toggleDocumentTypeUseCase.execute(id);
  }
}
