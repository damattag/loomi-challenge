import { beforeEach, expect, describe, it } from 'vitest';

import { InMemoryOrderItemsRepository } from '@repositories/in-memory/in-memory-order-items-repository';
import { InMemoryOrderRepository } from '@repositories/in-memory/in-memory-order-repository';

import { RegisterOrderItemUseCase } from '@use-cases/order-item/register';

let orderItemRepository: InMemoryOrderItemsRepository;
let orderRepository: InMemoryOrderRepository;
let sut: RegisterOrderItemUseCase;

describe('Register Order Item Use Case', () => {
  beforeEach(() => {
    orderItemRepository = new InMemoryOrderItemsRepository();
    orderRepository = new InMemoryOrderRepository();
    sut = new RegisterOrderItemUseCase(orderItemRepository, orderRepository);
  });

  it('should be able register a new order item', async () => {
    const order = await orderRepository.create({
      consumerId: 'consumer-id',
    });

    const { orderItem } = await sut.execute({
      orderId: order.id,
      productId: 'product-id',
      quantity: 2,
      unitPrice: 10,
    });

    expect(orderItem.id).toEqual(expect.any(String));
    expect(orderItem.orderId).toBe(order.id);
  });
});
