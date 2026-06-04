import { OcrExtractedFieldEntity } from '../entities/ocr-extracted-field.entity';

export const OCR_EXTRACTED_FIELDS_REPOSITORY = Symbol('OCR_EXTRACTED_FIELDS_REPOSITORY');

export interface CreateOcrExtractedFieldData {
  ocrResultId: string;
  fieldName: string;
  value?: string;
  confidence?: number;
}

export interface OcrExtractedFieldsRepository {
  findAll(): Promise<OcrExtractedFieldEntity[]>;
  findById(id: string): Promise<OcrExtractedFieldEntity | null>;
  findByOcrResult(ocrResultId: string): Promise<OcrExtractedFieldEntity[]>;
  create(data: CreateOcrExtractedFieldData): Promise<OcrExtractedFieldEntity>;
}
