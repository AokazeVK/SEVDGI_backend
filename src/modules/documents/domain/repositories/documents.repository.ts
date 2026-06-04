import { DocumentEntity } from '../entities/document.entity';

export const DOCUMENTS_REPOSITORY = Symbol('DOCUMENTS_REPOSITORY');

export interface CreateDocumentData {
  documentTypeId: string;
  title?: string;
  description?: string;
  warehouseEntryId?: string;
  prescriptionId?: string;
}

export interface UpdateDocumentData {
  documentTypeId?: string;
  title?: string;
  description?: string;
  warehouseEntryId?: string;
  prescriptionId?: string;
}

export interface DocumentsRepository {
  findAll(): Promise<DocumentEntity[]>;
  findById(id: string): Promise<DocumentEntity | null>;
  findByWarehouseEntry(warehouseEntryId: string): Promise<DocumentEntity[]>;
  findByPrescription(prescriptionId: string): Promise<DocumentEntity[]>;
  create(data: CreateDocumentData): Promise<DocumentEntity>;
  update(id: string, data: UpdateDocumentData): Promise<DocumentEntity>;
  markAsOcrProcessed(id: string): Promise<DocumentEntity>;
  markAsValidated(id: string): Promise<DocumentEntity>;
  markAsRejected(id: string): Promise<DocumentEntity>;
}
