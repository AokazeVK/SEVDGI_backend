import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/prisma/prisma.service';
import { UnitEntity } from '../../domain/entities/unit.entity';
import {
  CreateUnitData,
  UnitsRepository,
  UpdateUnitData,
} from '../../domain/repositories/units.repository';

@Injectable()
export class PrismaUnitsRepository implements UnitsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<UnitEntity[]> {
    const units = await this.prisma.unit.findMany({
      orderBy: { name: 'asc' },
    });

    return units.map((unit) => this.toEntity(unit));
  }

  async findById(id: string): Promise<UnitEntity | null> {
    const unit = await this.prisma.unit.findUnique({
      where: { id },
    });

    return unit ? this.toEntity(unit) : null;
  }

  async findByName(name: string): Promise<UnitEntity | null> {
    const unit = await this.prisma.unit.findFirst({
      where: { name },
    });

    return unit ? this.toEntity(unit) : null;
  }

  async findBySymbol(symbol: string): Promise<UnitEntity | null> {
    const unit = await this.prisma.unit.findUnique({
      where: { symbol },
    });

    return unit ? this.toEntity(unit) : null;
  }

  async create(data: CreateUnitData): Promise<UnitEntity> {
    const unit = await this.prisma.unit.create({
      data: {
        name: data.name,
        symbol: data.symbol,
      },
    });

    return this.toEntity(unit);
  }

  async update(id: string, data: UpdateUnitData): Promise<UnitEntity> {
    const unit = await this.prisma.unit.update({
      where: { id },
      data: {
        name: data.name,
        symbol: data.symbol,
      },
    });

    return this.toEntity(unit);
  }

  async toggle(id: string): Promise<UnitEntity> {
    const current = await this.prisma.unit.findUnique({
      where: { id },
      select: { isActive: true },
    });

    const unit = await this.prisma.unit.update({
      where: { id },
      data: {
        isActive: !current?.isActive,
      },
    });

    return this.toEntity(unit);
  }

  private toEntity(unit: any): UnitEntity {
    return new UnitEntity(unit.id, unit.name, unit.symbol, unit.isActive);
  }
}
