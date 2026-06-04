import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { Audit } from '../../../../core/decorators/audit.decorator';
import { RequirePermissions } from '../../../../core/decorators/require-permissions.decorator';
import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../core/guards/permissions.guard';

import { CreateDocumentFileDto } from '../../application/dto/create-document-file.dto';

import { CreateDocumentFileUseCase } from '../../application/use-cases/create-document-file.use-case';
import { GetDocumentFileByIdUseCase } from '../../application/use-cases/get-document-file-by-id.use-case';
import { GetDocumentFilesByDocumentUseCase } from '../../application/use-cases/get-document-files-by-document.use-case';
import { GetDocumentFilesUseCase } from '../../application/use-cases/get-document-files.use-case';
import { multerDocumentConfig } from 'src/core/storage/multer.config';

@ApiTags('Document Files')
@ApiBearerAuth()
@Controller('document-files')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class DocumentFilesController {
  constructor(
    private readonly getDocumentFilesUseCase: GetDocumentFilesUseCase,
    private readonly getDocumentFileByIdUseCase: GetDocumentFileByIdUseCase,
    private readonly getDocumentFilesByDocumentUseCase: GetDocumentFilesByDocumentUseCase,
    private readonly createDocumentFileUseCase: CreateDocumentFileUseCase,
  ) {}

  @Get()
  @RequirePermissions('document-files.read')
  @Audit('Listar archivos documentales')
  @ApiOperation({ summary: 'Listar archivos documentales' })
  findAll() {
    return this.getDocumentFilesUseCase.execute();
  }

  @Get('document/:documentId')
  @RequirePermissions('document-files.read')
  @Audit('Listar archivos por documento')
  @ApiOperation({ summary: 'Listar archivos por documento' })
  findByDocument(@Param('documentId') documentId: string) {
    return this.getDocumentFilesByDocumentUseCase.execute(documentId);
  }

  @Get(':id')
  @RequirePermissions('document-files.read')
  @Audit('Obtener archivo documental')
  @ApiOperation({ summary: 'Obtener archivo documental por ID' })
  findById(@Param('id') id: string) {
    return this.getDocumentFileByIdUseCase.execute(id);
  }

  @Post()
  @RequirePermissions('document-files.create')
  @Audit('Crear archivo documental')
  @ApiOperation({ summary: 'Crear archivo documental' })
  create(@Body() dto: CreateDocumentFileDto) {
    return this.createDocumentFileUseCase.execute(dto);
  }
  @Post('upload')
  @RequirePermissions('document-files.create')
  @Audit('Subir archivo documental')
  @ApiOperation({ summary: 'Subir archivo documental' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        documentId: {
          type: 'string',
          example: 'uuid-document',
        },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['documentId', 'file'],
    },
  })
  @UseInterceptors(FileInterceptor('file', multerDocumentConfig))
  upload(@Body('documentId') documentId: string, @UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Debe subir un archivo válido');
    }

    return this.createDocumentFileUseCase.execute({
      documentId,
      filePath: file.path,
      fileName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
    });
  }
}
