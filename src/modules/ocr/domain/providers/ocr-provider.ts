export const OCR_PROVIDER = Symbol('OCR_PROVIDER');

export interface OcrProviderResult {
  rawText: string;
  confidence: number | null;
}

export interface OcrProvider {
  processFile(filePath: string): Promise<OcrProviderResult>;
}
