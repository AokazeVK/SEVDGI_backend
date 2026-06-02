import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/prisma/prisma.service';

import { SanitaryRegistrationEntity } from '../../domain/entities/sanitary-registration.entity';

import {
  CreateSanitaryRegistrationData,
  SanitaryRegistrationsRepository,
  UpdateSanitaryRegistrationData,
} from '../../domain/repositories/sanitary-registrations.repository';

@Injectable()
export class PrismaSanitaryRegistrationsRepository implements SanitaryRegistrationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<SanitaryRegistrationEntity[]> {
    const items = await this.prisma.sanitaryRegistration.findMany({
      include: {
        medicine: true,
        laboratory: true,
      },
      orderBy: {
        registrationNumber: 'asc',
      },
    });

    return items.map((item) => this.toEntity(item));
  }

  async findById(id: string): Promise<SanitaryRegistrationEntity | null> {
    const item = await this.prisma.sanitaryRegistration.findUnique({
      where: { id },
      include: {
        medicine: true,
        laboratory: true,
      },
    });

    return item ? this.toEntity(item) : null;
  }

  async findByRegistrationNumber(
    registrationNumber: string,
  ): Promise<SanitaryRegistrationEntity | null> {
    const item = await this.prisma.sanitaryRegistration.findUnique({
      where: {
        registrationNumber,
      },
      include: {
        medicine: true,
        laboratory: true,
      },
    });

    return item ? this.toEntity(item) : null;
  }

  async create(data: CreateSanitaryRegistrationData): Promise<SanitaryRegistrationEntity> {
    const item = await this.prisma.sanitaryRegistration.create({
      data,
      include: {
        medicine: true,
        laboratory: true,
      },
    });

    return this.toEntity(item);
  }

  async update(
    id: string,
    data: UpdateSanitaryRegistrationData,
  ): Promise<SanitaryRegistrationEntity> {
    const item = await this.prisma.sanitaryRegistration.update({
      where: { id },
      data,
      include: {
        medicine: true,
        laboratory: true,
      },
    });

    return this.toEntity(item);
  }

  async toggle(id: string): Promise<SanitaryRegistrationEntity> {
    const current = await this.prisma.sanitaryRegistration.findUnique({
      where: { id },
      select: {
        isActive: true,
      },
    });

    const item = await this.prisma.sanitaryRegistration.update({
      where: { id },
      data: {
        isActive: !current?.isActive,
      },
      include: {
        medicine: true,
        laboratory: true,
      },
    });

    return this.toEntity(item);
  }

  private toEntity(item: any): SanitaryRegistrationEntity {
    return new SanitaryRegistrationEntity(
      item.id,
      item.medicineId,
      item.laboratoryId,
      item.registrationNumber,
      item.issuedAt,
      item.expiresAt,
      item.isActive,
      item.medicine?.name ?? null,
      item.laboratory?.name ?? null,
    );
  }
}
