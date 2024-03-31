import { OrderItem, Prisma } from '@prisma/client';

import prisma from '@database';

import { IOrderItemRepository } from '@repositories/order-item-repository';

export class OrderItemRepository implements IOrderItemRepository {
  async create(data: Prisma.OrderItemUncheckedCreateInput): Promise<OrderItem> {
    const orderItem = await prisma.orderItem.create({ data });

    return orderItem;
  }

  async findById(id: string): Promise<OrderItem | null> {
    const orderItem = await prisma.orderItem.findUnique({ where: { id } });

    return orderItem;
  }

  async findByOrderId(orderId: string): Promise<OrderItem[]> {
    const orderItems = await prisma.orderItem.findMany({
      where: { orderId },
    });

    return orderItems;
  }

  async save(
    id: string,
    data: Prisma.OrderItemUpdateInput,
  ): Promise<OrderItem> {
    const orderItem = await prisma.orderItem.update({
      where: { id },
      data,
    });

    return orderItem;
  }
}
