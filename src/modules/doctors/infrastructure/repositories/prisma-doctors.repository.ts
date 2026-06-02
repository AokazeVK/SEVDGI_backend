import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/prisma/prisma.service';
import { DoctorEntity } from '../../domain/entities/doctor.entity';
import {
  CreateDoctorData,
  DoctorsRepository,
  UpdateDoctorData,
} from '../../domain/repositories/doctors.repository';

@Injectable()
export class PrismaDoctorsRepository implements DoctorsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<DoctorEntity[]> {
    const doctors = await this.prisma.doctor.findMany({
      orderBy: {
        fullName: 'asc',
      },
    });

    return doctors.map((doctor) => this.toEntity(doctor));
  }

  async findById(id: string): Promise<DoctorEntity | null> {
    const doctor = await this.prisma.doctor.findUnique({
      where: { id },
    });

    return doctor ? this.toEntity(doctor) : null;
  }

  async findByLicenseNumber(licenseNumber: string): Promise<DoctorEntity | null> {
    const doctor = await this.prisma.doctor.findFirst({
      where: { licenseNumber },
    });

    return doctor ? this.toEntity(doctor) : null;
  }

  async create(data: CreateDoctorData): Promise<DoctorEntity> {
    const doctor = await this.prisma.doctor.create({
      data: {
        fullName: data.fullName,
        licenseNumber: data.licenseNumber,
        specialty: data.specialty,
      },
    });

    return this.toEntity(doctor);
  }

  async update(id: string, data: UpdateDoctorData): Promise<DoctorEntity> {
    const doctor = await this.prisma.doctor.update({
      where: { id },
      data: {
        fullName: data.fullName,
        licenseNumber: data.licenseNumber,
        specialty: data.specialty,
      },
    });

    return this.toEntity(doctor);
  }

  async toggle(id: string): Promise<DoctorEntity> {
    const current = await this.prisma.doctor.findUnique({
      where: { id },
      select: { isActive: true },
    });

    const doctor = await this.prisma.doctor.update({
      where: { id },
      data: {
        isActive: !current?.isActive,
      },
    });

    return this.toEntity(doctor);
  }

  private toEntity(doctor: any): DoctorEntity {
    return new DoctorEntity(
      doctor.id,
      doctor.fullName,
      doctor.licenseNumber,
      doctor.specialty,
      doctor.isActive,
    );
  }
}
