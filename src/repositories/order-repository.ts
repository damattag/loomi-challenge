import { Order, Prisma } from '@prisma/client';
import { OrderFilters } from './prisma/prisma-order-repository';

export interface IOrderRepository {
  create: (order: Prisma.OrderUncheckedCreateInput) => Promise<Order>;
  findById: (id: string) => Promise<Order | null>;
  findAll: (filters: OrderFilters) => Promise<Order[]>;
  save: (id: string, order: Prisma.OrderUncheckedUpdateInput) => Promise<Order>;
  delete: (id: string) => Promise<Order>;
}
