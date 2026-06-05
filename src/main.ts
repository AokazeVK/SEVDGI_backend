import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');

  app.enableCors();

  app.use(helmet());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Sistema Experto')
    .setDescription(
      'Sistema experto para validación documental, OCR, almacén, farmacia e inventario',
    )
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  const tagOrder = [
    'Auth',
    'Users',
    'Roles',
    'Permissions',

    'Active Ingredients',
    'Medicines',
    'Pharmaceutical Forms',
    'Therapeutic Groups',
    'Units',
    'Laboratories',
    'Manufacturers',
    'Suppliers',
    'Sanitary Registrations',

    'Warehouse',
    'Warehouse Entries',
    'Warehouse Inventory',
    'Medicine Batches',
    'Stock Movements',
    'Kardex',

    'Pharmacy',
    'Pharmacy Receptions',
    'Pharmacy Inventory',
    'Pharmacy Dispensations',

    'Patients',
    'Doctors',
    'Medical Services',
    'Prescriptions',
    'Requests',
    'Dispatches',

    'Alerts',

    'Documents',
    'Document Types',
    'Document Files',

    'OCR Results',
    'OCR Extracted Fields',

    'Expert Rules',
    'Validation Processes',
    'Inference Engine',
  ];

  document.tags = tagOrder.map((name) => ({ name }));

  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      operationsSorter: 'alpha',
      docExpansion: 'list',
      filter: true,
    },
  });

  const port = process.env.PORT ?? 3000;

  await app.listen(port);

  console.log(`API: http://localhost:${port}/api`);
  console.log(`Swagger: http://localhost:${port}/api/docs`);
}

bootstrap();
