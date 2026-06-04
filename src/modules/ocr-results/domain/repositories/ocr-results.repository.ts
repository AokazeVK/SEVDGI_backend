import { OcrResultEntity } from '../entities/ocr-result.entity';

export const OCR_RESULTS_REPOSITORY = Symbol('OCR_RESULTS_REPOSITORY');

export interface CreateOcrResultData {
  documentId: string;
  rawText: string;
  confidence?: number;
}

export interface OcrResultsRepository {
  findAll(): Promise<OcrResultEntity[]>;
  findById(id: string): Promise<OcrResultEntity | null>;
  findByDocument(documentId: string): Promise<OcrResultEntity[]>;
  create(data: CreateOcrResultData): Promise<OcrResultEntity>;
}
