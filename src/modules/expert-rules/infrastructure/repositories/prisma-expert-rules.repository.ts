import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/prisma/prisma.service';
import {
  ExpertRuleActionEntity,
  ExpertRuleConditionEntity,
  ExpertRuleEntity,
} from '../../domain/entities/expert-rule.entity';
import {
  CreateExpertRuleData,
  ExpertRulesRepository,
  UpdateExpertRuleData,
} from '../../domain/repositories/expert-rules.repository';

@Injectable()
export class PrismaExpertRulesRepository implements ExpertRulesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<ExpertRuleEntity[]> {
    const rules = await this.prisma.expertRule.findMany({
      orderBy: [
        {
          priority: 'asc',
        },
        {
          createdAt: 'desc',
        },
      ],
      include: {
        conditions: true,
        actions: true,
      },
    });

    return rules.map((rule) => this.toEntity(rule));
  }

  async findById(id: string): Promise<ExpertRuleEntity | null> {
    const rule = await this.prisma.expertRule.findUnique({
      where: { id },
      include: {
        conditions: true,
        actions: true,
      },
    });

    return rule ? this.toEntity(rule) : null;
  }

  async findByCode(code: string): Promise<ExpertRuleEntity | null> {
    const rule = await this.prisma.expertRule.findUnique({
      where: { code },
      include: {
        conditions: true,
        actions: true,
      },
    });

    return rule ? this.toEntity(rule) : null;
  }

  async create(data: CreateExpertRuleData): Promise<ExpertRuleEntity> {
    const rule = await this.prisma.expertRule.create({
      data: {
        code: data.code,
        name: data.name,
        description: data.description,
        module: data.module as any,
        priority: data.priority ?? 1,
        conditions: {
          create: data.conditions.map((condition) => ({
            leftField: condition.leftField,
            operator: condition.operator,
            rightField: condition.rightField,
            expectedValue: condition.expectedValue,
          })),
        },
        actions: {
          create: data.actions.map((action) => ({
            actionType: action.actionType,
            severity: action.severity ?? 'OBSERVED',
            message: action.message,
          })),
        },
      },
      include: {
        conditions: true,
        actions: true,
      },
    });

    return this.toEntity(rule);
  }

  async update(id: string, data: UpdateExpertRuleData): Promise<ExpertRuleEntity> {
    const rule = await this.prisma.$transaction(async (tx) => {
      await tx.expertRuleCondition.deleteMany({
        where: { ruleId: id },
      });

      await tx.expertRuleAction.deleteMany({
        where: { ruleId: id },
      });

      return tx.expertRule.update({
        where: { id },
        data: {
          code: data.code,
          name: data.name,
          description: data.description,
          module: data.module as any,
          priority: data.priority,
          conditions: data.conditions
            ? {
                create: data.conditions.map((condition) => ({
                  leftField: condition.leftField,
                  operator: condition.operator,
                  rightField: condition.rightField,
                  expectedValue: condition.expectedValue,
                })),
              }
            : undefined,
          actions: data.actions
            ? {
                create: data.actions.map((action) => ({
                  actionType: action.actionType,
                  severity: action.severity ?? 'OBSERVED',
                  message: action.message,
                })),
              }
            : undefined,
        },
        include: {
          conditions: true,
          actions: true,
        },
      });
    });

    return this.toEntity(rule);
  }

  async toggle(id: string): Promise<ExpertRuleEntity> {
    const current = await this.prisma.expertRule.findUnique({
      where: { id },
      select: {
        isActive: true,
      },
    });

    const rule = await this.prisma.expertRule.update({
      where: { id },
      data: {
        isActive: !current?.isActive,
      },
      include: {
        conditions: true,
        actions: true,
      },
    });

    return this.toEntity(rule);
  }

  private toEntity(rule: any): ExpertRuleEntity {
    return new ExpertRuleEntity(
      rule.id,
      rule.code,
      rule.name,
      rule.description,
      rule.module,
      rule.isActive,
      rule.priority,
      rule.conditions?.map(
        (condition: any) =>
          new ExpertRuleConditionEntity(
            condition.id,
            condition.leftField,
            condition.operator,
            condition.rightField,
            condition.expectedValue,
          ),
      ) ?? [],
      rule.actions?.map(
        (action: any) =>
          new ExpertRuleActionEntity(action.id, action.actionType, action.severity, action.message),
      ) ?? [],
    );
  }
}
