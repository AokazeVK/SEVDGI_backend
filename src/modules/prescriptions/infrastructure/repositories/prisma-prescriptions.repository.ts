import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/prisma/prisma.service';
import {
  PrescriptionDetailEntity,
  PrescriptionEntity,
} from '../../domain/entities/prescription.entity';
import {
  CreatePrescriptionData,
  PrescriptionsRepository,
} from '../../domain/repositories/prescriptions.repository';

@Injectable()
export class PrismaPrescriptionsRepository implements PrescriptionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<PrescriptionEntity[]> {
    const prescriptions = await this.prisma.prescription.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        patient: true,
        doctor: true,
        details: {
          include: {
            medicine: true,
          },
        },
      },
    });

    return prescriptions.map((prescription) => this.toEntity(prescription));
  }

  async findById(id: string): Promise<PrescriptionEntity | null> {
    const prescription = await this.prisma.prescription.findUnique({
      where: { id },
      include: {
        patient: true,
        doctor: true,
        details: {
          include: {
            medicine: true,
          },
        },
      },
    });

    return prescription ? this.toEntity(prescription) : null;
  }

  async findByPrescriptionNumber(prescriptionNumber: string): Promise<PrescriptionEntity | null> {
    const prescription = await this.prisma.prescription.findFirst({
      where: { prescriptionNumber },
      include: {
        patient: true,
        doctor: true,
        details: {
          include: {
            medicine: true,
          },
        },
      },
    });

    return prescription ? this.toEntity(prescription) : null;
  }

  async create(data: CreatePrescriptionData): Promise<PrescriptionEntity> {
    const prescription = await this.prisma.prescription.create({
      data: {
        patientId: data.patientId,
        doctorId: data.doctorId,
        medicalServiceId: data.medicalServiceId,
        prescriptionNumber: data.prescriptionNumber,
        issuedAt: data.issuedAt,
        diagnosis: data.diagnosis,
        observation: data.observation,
        status: 'PENDING',
        details: {
          create: data.details.map((detail) => ({
            medicineId: detail.medicineId,
            dosage: detail.dosage,
            frequency: detail.frequency,
            duration: detail.duration,
            quantity: detail.quantity,
          })),
        },
      },
      include: {
        patient: true,
        doctor: true,
        details: {
          include: {
            medicine: true,
          },
        },
      },
    });

    return this.toEntity(prescription);
  }

  async cancel(id: string): Promise<PrescriptionEntity> {
    const prescription = await this.prisma.prescription.update({
      where: { id },
      data: {
        status: 'CANCELLED',
      },
      include: {
        patient: true,
        doctor: true,
        details: {
          include: {
            medicine: true,
          },
        },
      },
    });

    return this.toEntity(prescription);
  }

  private toEntity(prescription: any): PrescriptionEntity {
    return new PrescriptionEntity(
      prescription.id,
      prescription.patientId,
      prescription.doctorId,
      prescription.medicalServiceId,
      prescription.prescriptionNumber,
      prescription.issuedAt,
      prescription.diagnosis,
      prescription.observation,
      prescription.status,
      prescription.patient?.fullName ?? null,
      prescription.doctor?.fullName ?? null,
      prescription.details?.map(
        (detail: any) =>
          new PrescriptionDetailEntity(
            detail.id,
            detail.medicineId,
            detail.medicine?.name ?? null,
            detail.dosage,
            detail.frequency,
            detail.duration,
            detail.quantity,
          ),
      ) ?? [],
    );
  }
}
