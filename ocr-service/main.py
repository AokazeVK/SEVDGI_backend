from fastapi import FastAPI
from pydantic import BaseModel
from paddleocr import PaddleOCR
import fitz
import cv2
import numpy as np
import os

app = FastAPI(title="OCR Service")

ocr = PaddleOCR(use_angle_cls=True, lang="es")


class OcrRequest(BaseModel):
    filePath: str


@app.post("/ocr/process")
def process_ocr(data: OcrRequest):
    file_path = data.filePath

    if not os.path.exists(file_path):
        return {
            "rawText": "",
            "confidence": 0,
            "error": "File not found",
        }

    texts = []
    confidences = []

    if file_path.lower().endswith(".pdf"):
        doc = fitz.open(file_path)

        for page in doc:
            pix = page.get_pixmap(dpi=200)
            img = np.frombuffer(pix.samples, dtype=np.uint8).reshape(
                pix.height,
                pix.width,
                pix.n,
            )

            if pix.n == 4:
                img = cv2.cvtColor(img, cv2.COLOR_RGBA2RGB)

            result = ocr.ocr(img, cls=True)
            collect_result(result, texts, confidences)

    else:
        img = cv2.imread(file_path)
        result = ocr.ocr(img, cls=True)
        collect_result(result, texts, confidences)

    avg_confidence = sum(confidences) / len(confidences) if confidences else 0

    return {
        "rawText": "\n".join(texts),
        "confidence": round(avg_confidence, 4),
    }


def collect_result(result, texts, confidences):
    for page_result in result:
        if not page_result:
            continue

        for line in page_result:
            text = line[1][0]
            confidence = line[1][1]

            texts.append(text)
            confidences.append(confidence)