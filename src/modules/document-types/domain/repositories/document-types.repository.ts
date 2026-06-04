import { DocumentTypeEntity } from '../entities/document-type.entity';

export const DOCUMENT_TYPES_REPOSITORY = Symbol('DOCUMENT_TYPES_REPOSITORY');

export interface CreateDocumentTypeData {
  code: string;
  name: string;
  description?: string;
  isRequired?: boolean;
}

export interface UpdateDocumentTypeData {
  code?: string;
  name?: string;
  description?: string;
  isRequired?: boolean;
}

export interface DocumentTypesRepository {
  findAll(): Promise<DocumentTypeEntity[]>;
  findById(id: string): Promise<DocumentTypeEntity | null>;
  findByCode(code: string): Promise<DocumentTypeEntity | null>;
  create(data: CreateDocumentTypeData): Promise<DocumentTypeEntity>;
  update(id: string, data: UpdateDocumentTypeData): Promise<DocumentTypeEntity>;
  toggle(id: string): Promise<DocumentTypeEntity>;
}
