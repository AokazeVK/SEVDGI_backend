import { DocumentFileEntity } from '../entities/document-file.entity';

export const DOCUMENT_FILES_REPOSITORY = Symbol('DOCUMENT_FILES_REPOSITORY');

export interface CreateDocumentFileData {
  documentId: string;
  filePath: string;
  fileName: string;
  mimeType: string;
  size?: number;
}

export interface DocumentFilesRepository {
  findAll(): Promise<DocumentFileEntity[]>;
  findById(id: string): Promise<DocumentFileEntity | null>;
  findByDocument(documentId: string): Promise<DocumentFileEntity[]>;
  create(data: CreateDocumentFileData): Promise<DocumentFileEntity>;
}
