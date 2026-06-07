# OCR Service

## Python

3.11.13

## Crear entorno

python -m venv venv

## Activar

source venv/bin/activate.fish

## Instalar Paddle

pip install paddlepaddle==2.6.2 -i https://www.paddlepaddle.org.cn/packages/stable/cpu/

## Instalar dependencias

pip install -r requirements.txt

## Ejecutar

uvicorn main:app --host 0.0.0.0 --port 8000 --reload
