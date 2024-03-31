import { PrismaOrderItemRepository } from '@repositories/prisma/prisma-order-item-repository';
import { PrismaOrderRepository } from '@repositories/prisma/prisma-order-repository';

import { RegisterOrderItemUseCase } from '@use-cases/order-item/register';

export function makeRegisterOrderItemUseCase() {
  const orderItemRepository = new PrismaOrderItemRepository();
  const orderRepository = new PrismaOrderRepository();
  const registerOrderItemUseCase = new RegisterOrderItemUseCase(
    orderItemRepository,
    orderRepository,
  );

  return registerOrderItemUseCase;
}
