import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../../../core/prisma/prisma.service';
import {
  InferenceDetailEntity,
  InferenceResultEntity,
} from '../../domain/entities/inference-result.entity';
import { ConditionEvaluatorService } from './condition-evaluator.service';

type FieldMap = Record<string, string | null>;

type ValidationStatusResult = 'APPROVED' | 'REJECTED' | 'OBSERVED';

@Injectable()
export class InferenceEngineService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly conditionEvaluator: ConditionEvaluatorService,
  ) {}

  async process(validationProcessId: string): Promise<InferenceResultEntity> {
    const process = await this.prisma.validationProcess.findUnique({
      where: { id: validationProcessId },
      include: {
        document: {
          include: {
            ocrResults: {
              include: {
                fields: true,
              },
              orderBy: {
                createdAt: 'desc',
              },
              take: 1,
            },
          },
        },
      },
    });

    if (!process) {
      throw new NotFoundException('Proceso de validación no encontrado');
    }

    if (!process.document) {
      throw new NotFoundException('El proceso de validación no tiene documento asociado');
    }

    const latestOcrResult = process.document.ocrResults[0];

    if (!latestOcrResult) {
      throw new NotFoundException('El documento no tiene resultado OCR asociado');
    }

    const fields = this.buildFieldMap(latestOcrResult.fields);

    const rules = await this.prisma.expertRule.findMany({
      where: {
        isActive: true,
        module: 'DOCUMENTS',
      },
      orderBy: {
        priority: 'asc',
      },
      include: {
        conditions: true,
        actions: true,
      },
    });

    const detailsToCreate: {
      ruleId: string;
      status: ValidationStatusResult;
      message: string;
    }[] = [];

    const responseDetails: InferenceDetailEntity[] = [];

    let finalStatus: ValidationStatusResult = 'APPROVED';

    for (const rule of rules) {
      const passed = rule.conditions.every((condition) =>
        this.conditionEvaluator.evaluate({
          fields,
          leftField: condition.leftField,
          operator: condition.operator,
          rightField: condition.rightField,
          expectedValue: condition.expectedValue,
        }),
      );

      if (passed) {
        const message = `Regla cumplida: ${rule.name}`;

        detailsToCreate.push({
          ruleId: rule.id,
          status: 'APPROVED',
          message,
        });

        responseDetails.push(
          new InferenceDetailEntity(rule.id, rule.code, rule.name, 'APPROVED', message),
        );

        continue;
      }

      const action = rule.actions[0];
      const severity = this.normalizeSeverity(action?.severity);

      if (severity === 'REJECTED') {
        finalStatus = 'REJECTED';
      }

      if (severity === 'OBSERVED' && finalStatus !== 'REJECTED') {
        finalStatus = 'OBSERVED';
      }

      const message = action?.message ?? `Regla no cumplida: ${rule.name}`;

      detailsToCreate.push({
        ruleId: rule.id,
        status: severity,
        message,
      });

      responseDetails.push(
        new InferenceDetailEntity(rule.id, rule.code, rule.name, severity, message),
      );
    }

    const summary = this.buildSummary(finalStatus);

    await this.prisma.$transaction(async (tx) => {
      await tx.validationResult.create({
        data: {
          processId: validationProcessId,
          status: finalStatus,
          summary,
          details: {
            create: detailsToCreate,
          },
        },
      });

      await tx.validationProcess.update({
        where: { id: validationProcessId },
        data: {
          status: finalStatus,
        },
      });

      await tx.document.update({
        where: { id: process.documentId! },
        data: {
          status: finalStatus === 'REJECTED' ? 'REJECTED' : 'VALIDATED',
        },
      });
    });

    return new InferenceResultEntity(validationProcessId, finalStatus, summary, responseDetails);
  }

  private buildFieldMap(
    fields: {
      fieldName: string;
      value: string | null;
    }[],
  ): FieldMap {
    return fields.reduce<FieldMap>((acc, field) => {
      acc[field.fieldName.trim().toUpperCase()] = field.value;
      return acc;
    }, {});
  }

  private normalizeSeverity(severity?: string): ValidationStatusResult {
    if (severity === 'REJECTED') return 'REJECTED';
    if (severity === 'APPROVED') return 'APPROVED';

    return 'OBSERVED';
  }

  private buildSummary(status: ValidationStatusResult) {
    if (status === 'APPROVED') {
      return 'Validación aprobada por el sistema experto';
    }

    if (status === 'REJECTED') {
      return 'Validación rechazada por el sistema experto';
    }

    return 'Validación observada por el sistema experto';
  }
}
