import { Prisma, Order, $Enums } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

import prisma from '@database';

import { IOrderRepository } from '@repositories/order-repository';

export interface OrderFilters {
  consumerId?: string;
  minDate?: Date;
  maxDate?: Date;
  minPrice?: Decimal | number;
  maxPrice?: Decimal | number;
  status?: $Enums.OrderStatus;
}

export class PrismaOrderRepository implements IOrderRepository {
  async create(data: Prisma.OrderUncheckedCreateInput): Promise<Order> {
    const order = await prisma.order.create({ data });

    return order;
  }

  async findById(id: string): Promise<Order | null> {
    const order = await prisma.order.findUnique({ where: { id } });

    return order;
  }

  async findAll({
    consumerId,
    maxDate,
    maxPrice,
    minDate,
    minPrice,
    status,
  }: OrderFilters): Promise<Order[]> {
    const orders = await prisma.order.findMany({
      where: {
        consumerId,
        createdAt: {
          gte: minDate,
          lte: maxDate,
        },
        total: {
          gte: minPrice,
          lte: maxPrice,
        },
        status: status || { not: 'OPENED' },
      },
    });

    return orders;
  }

  async save(
    id: string,
    data: Prisma.OrderUncheckedUpdateInput,
  ): Promise<Order> {
    const order = await prisma.order.update({
      where: { id },
      data,
    });

    return order;
  }

  async delete(id: string): Promise<Order> {
    const order = await prisma.order.delete({ where: { id } });

    return order;
  }
}
