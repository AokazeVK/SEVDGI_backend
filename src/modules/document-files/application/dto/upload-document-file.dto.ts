import { ApiProperty } from '@nestjs/swagger';

export class UploadDocumentFileDto {
  @ApiProperty({ example: 'uuid-document' })
  documentId!: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  file!: Express.Multer.File;
}
