import { Injectable } from '@nestjs/common';

type FieldMap = Record<string, string | null>;

@Injectable()
export class ConditionEvaluatorService {
  evaluate(params: {
    fields: FieldMap;
    leftField: string;
    operator: string;
    rightField: string | null;
    expectedValue: string | null;
  }): boolean {
    const leftKey = params.leftField.trim().toUpperCase();
    const rightKey = params.rightField?.trim().toUpperCase();

    const leftValue = params.fields[leftKey];
    const rightValue = rightKey ? params.fields[rightKey] : null;
    const expectedValue = params.expectedValue;

    switch (params.operator.trim().toUpperCase()) {
      case 'EXISTS':
        return leftValue !== undefined && leftValue !== null && leftValue !== '';

      case 'NOT_EXISTS':
        return leftValue === undefined || leftValue === null || leftValue === '';

      case 'EQUALS':
        return String(leftValue ?? '').trim() === String(expectedValue ?? '').trim();

      case 'NOT_EQUALS':
        return String(leftValue ?? '').trim() !== String(expectedValue ?? '').trim();

      case 'EQUALS_FIELD':
        return String(leftValue ?? '').trim() === String(rightValue ?? '').trim();

      case 'CONTAINS':
        return String(leftValue ?? '')
          .toLowerCase()
          .includes(String(expectedValue ?? '').toLowerCase());

      case 'GREATER_THAN':
        return Number(leftValue) > Number(expectedValue);

      case 'LESS_THAN':
        return Number(leftValue) < Number(expectedValue);

      case 'GREATER_OR_EQUAL':
        return Number(leftValue) >= Number(expectedValue);

      case 'LESS_OR_EQUAL':
        return Number(leftValue) <= Number(expectedValue);

      default:
        return false;
    }
  }
}
