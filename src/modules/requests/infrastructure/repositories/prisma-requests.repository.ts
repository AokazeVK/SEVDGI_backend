import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/prisma/prisma.service';
import { RequestDetailEntity, RequestEntity } from '../../domain/entities/request.entity';
import {
  CreateRequestData,
  RequestsRepository,
} from '../../domain/repositories/requests.repository';

@Injectable()
export class PrismaRequestsRepository implements RequestsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<RequestEntity[]> {
    const requests = await this.prisma.request.findMany({
      orderBy: {
        requestedAt: 'desc',
      },
      include: {
        pharmacy: true,
        details: {
          include: {
            medicine: true,
          },
        },
      },
    });

    return requests.map((request) => this.toEntity(request));
  }

  async findById(id: string): Promise<RequestEntity | null> {
    const request = await this.prisma.request.findUnique({
      where: { id },
      include: {
        pharmacy: true,
        details: {
          include: {
            medicine: true,
          },
        },
      },
    });

    return request ? this.toEntity(request) : null;
  }

  async create(data: CreateRequestData): Promise<RequestEntity> {
    const request = await this.prisma.request.create({
      data: {
        pharmacyId: data.pharmacyId,
        observation: data.observation,
        status: 'PENDING',
        details: {
          create: data.details.map((detail) => ({
            medicineId: detail.medicineId,
            quantity: detail.quantity,
          })),
        },
      },
      include: {
        pharmacy: true,
        details: {
          include: {
            medicine: true,
          },
        },
      },
    });

    return this.toEntity(request);
  }

  async approve(id: string): Promise<RequestEntity> {
    const request = await this.prisma.request.update({
      where: { id },
      data: {
        status: 'APPROVED',
      },
      include: {
        pharmacy: true,
        details: {
          include: {
            medicine: true,
          },
        },
      },
    });

    return this.toEntity(request);
  }

  async reject(id: string): Promise<RequestEntity> {
    const request = await this.prisma.request.update({
      where: { id },
      data: {
        status: 'REJECTED',
      },
      include: {
        pharmacy: true,
        details: {
          include: {
            medicine: true,
          },
        },
      },
    });

    return this.toEntity(request);
  }

  async cancel(id: string): Promise<RequestEntity> {
    const request = await this.prisma.request.update({
      where: { id },
      data: {
        status: 'CANCELLED',
      },
      include: {
        pharmacy: true,
        details: {
          include: {
            medicine: true,
          },
        },
      },
    });

    return this.toEntity(request);
  }

  private toEntity(request: any): RequestEntity {
    return new RequestEntity(
      request.id,
      request.pharmacyId,
      request.status,
      request.requestedAt,
      request.observation,
      request.pharmacy?.name ?? null,
      request.details?.map(
        (detail: any) =>
          new RequestDetailEntity(
            detail.id,
            detail.medicineId,
            detail.medicine?.name ?? null,
            detail.quantity,
          ),
      ) ?? [],
    );
  }
}
