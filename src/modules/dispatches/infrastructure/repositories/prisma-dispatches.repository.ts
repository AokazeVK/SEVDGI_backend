import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../../../core/prisma/prisma.service';
import { DispatchDetailEntity, DispatchEntity } from '../../domain/entities/dispatch.entity';
import {
  CreateDispatchData,
  DispatchesRepository,
} from '../../domain/repositories/dispatches.repository';

@Injectable()
export class PrismaDispatchesRepository implements DispatchesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<DispatchEntity[]> {
    const dispatches = await this.prisma.dispatch.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        warehouse: true,
        details: {
          include: {
            medicine: true,
            batch: true,
          },
        },
      },
    });

    return dispatches.map((dispatch) => this.toEntity(dispatch));
  }

  async findById(id: string): Promise<DispatchEntity | null> {
    const dispatch = await this.prisma.dispatch.findUnique({
      where: { id },
      include: {
        warehouse: true,
        details: {
          include: {
            medicine: true,
            batch: true,
          },
        },
      },
    });

    return dispatch ? this.toEntity(dispatch) : null;
  }

  async create(data: CreateDispatchData): Promise<DispatchEntity> {
    const dispatch = await this.prisma.$transaction(async (tx) => {
      const request = await tx.request.findUnique({
        where: { id: data.requestId },
        include: {
          details: true,
        },
      });

      if (!request) {
        throw new NotFoundException('Solicitud no encontrada');
      }

      if (request.status !== 'APPROVED') {
        throw new BadRequestException('Solo se pueden despachar solicitudes aprobadas');
      }

      const warehouse = await tx.warehouse.findUnique({
        where: { id: data.warehouseId },
      });

      if (!warehouse) {
        throw new NotFoundException('Almacén no encontrado');
      }

      if (!request.details || request.details.length === 0) {
        throw new BadRequestException('La solicitud no tiene detalles');
      }

      const createdDispatch = await tx.dispatch.create({
        data: {
          requestId: data.requestId,
          warehouseId: data.warehouseId,
          status: 'SENT',
          dispatchedAt: new Date(),
        },
      });

      for (const requestDetail of request.details) {
        let remainingQuantity = requestDetail.quantity;

        const availableInventory = await tx.warehouseInventory.findMany({
          where: {
            warehouseId: data.warehouseId,
            medicineId: requestDetail.medicineId,
            stock: {
              gt: 0,
            },
            batch: {
              isActive: true,
            },
          },
          include: {
            batch: true,
          },
          orderBy: {
            batch: {
              expirationDate: 'asc',
            },
          },
        });

        const totalAvailable = availableInventory.reduce((sum, item) => sum + item.stock, 0);

        if (totalAvailable < requestDetail.quantity) {
          throw new BadRequestException(
            `Stock insuficiente para el medicamento ${requestDetail.medicineId}. Requerido: ${requestDetail.quantity}, disponible: ${totalAvailable}`,
          );
        }

        for (const inventory of availableInventory) {
          if (remainingQuantity <= 0) break;

          const quantityToDispatch = Math.min(inventory.stock, remainingQuantity);

          const updatedInventory = await tx.warehouseInventory.update({
            where: { id: inventory.id },
            data: {
              stock: {
                decrement: quantityToDispatch,
              },
            },
          });

          await tx.dispatchDetail.create({
            data: {
              dispatchId: createdDispatch.id,
              medicineId: requestDetail.medicineId,
              batchId: inventory.batchId,
              quantity: quantityToDispatch,
            },
          });

          await tx.stockMovement.create({
            data: {
              medicineId: requestDetail.medicineId,
              batchId: inventory.batchId,
              warehouseId: data.warehouseId,
              type: 'WAREHOUSE_DISPATCH',
              quantity: quantityToDispatch,
              referenceId: createdDispatch.id,
              observation: 'Despacho de almacén hacia farmacia',
            },
          });

          await tx.kardex.create({
            data: {
              medicineId: requestDetail.medicineId,
              batchId: inventory.batchId,
              warehouseId: data.warehouseId,
              movementType: 'WAREHOUSE_DISPATCH',
              quantityIn: 0,
              quantityOut: quantityToDispatch,
              balance: updatedInventory.stock,
              referenceId: createdDispatch.id,
            },
          });

          remainingQuantity -= quantityToDispatch;
        }
      }

      await tx.request.update({
        where: { id: data.requestId },
        data: {
          status: 'DISPATCHED',
        },
      });

      return tx.dispatch.findUnique({
        where: { id: createdDispatch.id },
        include: {
          warehouse: true,
          details: {
            include: {
              medicine: true,
              batch: true,
            },
          },
        },
      });
    });

    return this.toEntity(dispatch);
  }

  async cancel(id: string): Promise<DispatchEntity> {
    const dispatch = await this.prisma.dispatch.update({
      where: { id },
      data: {
        status: 'CANCELLED',
      },
      include: {
        warehouse: true,
        details: {
          include: {
            medicine: true,
            batch: true,
          },
        },
      },
    });

    return this.toEntity(dispatch);
  }

  private toEntity(dispatch: any): DispatchEntity {
    return new DispatchEntity(
      dispatch.id,
      dispatch.requestId,
      dispatch.warehouseId,
      dispatch.status,
      dispatch.dispatchedAt,
      dispatch.warehouse?.name ?? null,
      dispatch.details?.map(
        (detail: any) =>
          new DispatchDetailEntity(
            detail.id,
            detail.medicineId,
            detail.medicine?.name ?? null,
            detail.batchId,
            detail.batch?.batchNumber ?? null,
            detail.quantity,
          ),
      ) ?? [],
    );
  }
}
