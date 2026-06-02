import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/prisma/prisma.service';

import { MedicalServiceEntity } from '../../domain/entities/medical-service.entity';

import {
  CreateMedicalServiceData,
  MedicalServicesRepository,
  UpdateMedicalServiceData,
} from '../../domain/repositories/medical-services.repository';

@Injectable()
export class PrismaMedicalServicesRepository implements MedicalServicesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<MedicalServiceEntity[]> {
    const services = await this.prisma.medicalService.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return services.map((item) => this.toEntity(item));
  }

  async findById(id: string): Promise<MedicalServiceEntity | null> {
    const service = await this.prisma.medicalService.findUnique({
      where: { id },
    });

    return service ? this.toEntity(service) : null;
  }

  async findByName(name: string): Promise<MedicalServiceEntity | null> {
    const service = await this.prisma.medicalService.findFirst({
      where: {
        name,
      },
    });

    return service ? this.toEntity(service) : null;
  }

  async create(data: CreateMedicalServiceData): Promise<MedicalServiceEntity> {
    const service = await this.prisma.medicalService.create({
      data,
    });

    return this.toEntity(service);
  }

  async update(id: string, data: UpdateMedicalServiceData): Promise<MedicalServiceEntity> {
    const service = await this.prisma.medicalService.update({
      where: { id },
      data,
    });

    return this.toEntity(service);
  }

  async toggle(id: string): Promise<MedicalServiceEntity> {
    const current = await this.prisma.medicalService.findUnique({
      where: { id },
      select: {
        isActive: true,
      },
    });

    const service = await this.prisma.medicalService.update({
      where: { id },
      data: {
        isActive: !current?.isActive,
      },
    });

    return this.toEntity(service);
  }

  private toEntity(service: any): MedicalServiceEntity {
    return new MedicalServiceEntity(
      service.id,
      service.name,
      service.description,
      service.isActive,
    );
  }
}
