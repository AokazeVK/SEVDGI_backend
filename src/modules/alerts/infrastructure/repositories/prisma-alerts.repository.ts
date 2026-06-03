import { Injectable } from '@nestjs/common';
import { Alert } from '@prisma/client';
import { PrismaService } from '../../../../core/prisma/prisma.service';
import { AlertEntity } from '../../domain/entities/alert.entity';
import { AlertsRepository } from '../../domain/repositories/alerts.repository';

@Injectable()
export class PrismaAlertsRepository implements AlertsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<AlertEntity[]> {
    const alerts = await this.prisma.alert.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return alerts.map((alert) => this.toEntity(alert));
  }

  async findPending(): Promise<AlertEntity[]> {
    const alerts = await this.prisma.alert.findMany({
      where: {
        status: 'PENDING',
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return alerts.map((alert) => this.toEntity(alert));
  }

  async findById(id: string): Promise<AlertEntity | null> {
    const alert = await this.prisma.alert.findUnique({
      where: { id },
    });

    return alert ? this.toEntity(alert) : null;
  }

  async markAsRead(id: string): Promise<AlertEntity> {
    const alert = await this.prisma.alert.update({
      where: { id },
      data: {
        status: 'READ',
      },
    });

    return this.toEntity(alert);
  }

  async resolve(id: string): Promise<AlertEntity> {
    const alert = await this.prisma.alert.update({
      where: { id },
      data: {
        status: 'RESOLVED',
        resolvedAt: new Date(),
      },
    });

    return this.toEntity(alert);
  }

  async generate(): Promise<AlertEntity[]> {
    const generatedAlerts = await this.prisma.$transaction(async (tx) => {
      const alertsToCreate: {
        type: 'LOW_STOCK' | 'EXPIRATION' | 'SANITARY_REGISTRATION_EXPIRED';
        title: string;
        message: string;
        referenceId?: string;
      }[] = [];

      const warehouseLowStock = await tx.warehouseInventory.findMany({
        where: {
          stock: {
            lte: this.prisma.warehouseInventory.fields.minimumStock,
          },
        },
        include: {
          warehouse: true,
          medicine: true,
          batch: true,
        },
      });

      for (const item of warehouseLowStock) {
        alertsToCreate.push({
          type: 'LOW_STOCK',
          title: 'Stock bajo en almacén',
          message: `${item.medicine.name} tiene stock bajo en ${item.warehouse.name}. Stock actual: ${item.stock}, mínimo: ${item.minimumStock}`,
          referenceId: item.id,
        });
      }

      const pharmacyLowStock = await tx.pharmacyInventory.findMany({
        where: {
          stock: {
            lte: this.prisma.pharmacyInventory.fields.minimumStock,
          },
        },
        include: {
          pharmacy: true,
          medicine: true,
          batch: true,
        },
      });

      for (const item of pharmacyLowStock) {
        alertsToCreate.push({
          type: 'LOW_STOCK',
          title: 'Stock bajo en farmacia',
          message: `${item.medicine.name} tiene stock bajo en ${item.pharmacy.name}. Stock actual: ${item.stock}, mínimo: ${item.minimumStock}`,
          referenceId: item.id,
        });
      }

      const today = new Date();
      const limitDate = new Date();
      limitDate.setDate(today.getDate() + 30);

      const expiringBatches = await tx.medicineBatch.findMany({
        where: {
          isActive: true,
          expirationDate: {
            lte: limitDate,
          },
        },
        include: {
          medicine: true,
        },
      });

      for (const batch of expiringBatches) {
        alertsToCreate.push({
          type: 'EXPIRATION',
          title: 'Lote próximo a vencer',
          message: `${batch.medicine.name} lote ${batch.batchNumber} vence el ${batch.expirationDate.toISOString().slice(0, 10)}`,
          referenceId: batch.id,
        });
      }

      const expiringRegistrations = await tx.sanitaryRegistration.findMany({
        where: {
          isActive: true,
          expiresAt: {
            lte: limitDate,
          },
        },
        include: {
          medicine: true,
          laboratory: true,
        },
      });

      for (const registration of expiringRegistrations) {
        alertsToCreate.push({
          type: 'SANITARY_REGISTRATION_EXPIRED',
          title: 'Registro sanitario próximo a vencer',
          message: `${registration.medicine.name} - ${registration.registrationNumber} vence el ${registration.expiresAt?.toISOString().slice(0, 10)}`,
          referenceId: registration.id,
        });
      }

      const created: Alert[] = [];

      for (const alert of alertsToCreate) {
        const exists = await tx.alert.findFirst({
          where: {
            type: alert.type,
            referenceId: alert.referenceId,
            status: {
              not: 'RESOLVED',
            },
          },
        });

        if (!exists) {
          const createdAlert = await tx.alert.create({
            data: alert,
          });

          created.push(createdAlert);
        }
      }

      return created;
    });

    return generatedAlerts.map((alert) => this.toEntity(alert));
  }

  private toEntity(alert: any): AlertEntity {
    return new AlertEntity(
      alert.id,
      alert.type,
      alert.status,
      alert.title,
      alert.message,
      alert.referenceId,
      alert.createdAt,
      alert.resolvedAt,
    );
  }
}
