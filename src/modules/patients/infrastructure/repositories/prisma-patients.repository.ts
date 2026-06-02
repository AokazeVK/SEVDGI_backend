import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/prisma/prisma.service';
import { PatientEntity } from '../../domain/entities/patient.entity';
import {
  CreatePatientData,
  PatientsRepository,
  UpdatePatientData,
} from '../../domain/repositories/patients.repository';

@Injectable()
export class PrismaPatientsRepository implements PatientsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<PatientEntity[]> {
    const patients = await this.prisma.patient.findMany({
      orderBy: {
        fullName: 'asc',
      },
    });

    return patients.map((patient) => this.toEntity(patient));
  }

  async findById(id: string): Promise<PatientEntity | null> {
    const patient = await this.prisma.patient.findUnique({
      where: { id },
    });

    return patient ? this.toEntity(patient) : null;
  }

  async findByCi(ci: string): Promise<PatientEntity | null> {
    const patient = await this.prisma.patient.findFirst({
      where: { ci },
    });

    return patient ? this.toEntity(patient) : null;
  }

  async create(data: CreatePatientData): Promise<PatientEntity> {
    const patient = await this.prisma.patient.create({
      data: {
        ci: data.ci,
        fullName: data.fullName,
        birthDate: data.birthDate,
        phone: data.phone,
        address: data.address,
      },
    });

    return this.toEntity(patient);
  }

  async update(id: string, data: UpdatePatientData): Promise<PatientEntity> {
    const patient = await this.prisma.patient.update({
      where: { id },
      data: {
        ci: data.ci,
        fullName: data.fullName,
        birthDate: data.birthDate,
        phone: data.phone,
        address: data.address,
      },
    });

    return this.toEntity(patient);
  }

  async toggle(id: string): Promise<PatientEntity> {
    const current = await this.prisma.patient.findUnique({
      where: { id },
      select: { isActive: true },
    });

    const patient = await this.prisma.patient.update({
      where: { id },
      data: {
        isActive: !current?.isActive,
      },
    });

    return this.toEntity(patient);
  }

  private toEntity(patient: any): PatientEntity {
    return new PatientEntity(
      patient.id,
      patient.ci,
      patient.fullName,
      patient.birthDate,
      patient.phone,
      patient.address,
      patient.isActive,
    );
  }
}
