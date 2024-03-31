import { OrderItem, Prisma } from '@prisma/client';

export interface IOrderItemRepository {
  create: (
    orderItem: Prisma.OrderItemUncheckedCreateInput,
  ) => Promise<OrderItem>;
  findById: (id: string) => Promise<OrderItem | null>;
  findByOrderId: (orderId: string) => Promise<OrderItem[]>;
  save: (
    id: string,
    orderItem: Prisma.OrderItemUncheckedUpdateInput,
  ) => Promise<OrderItem>;
}
