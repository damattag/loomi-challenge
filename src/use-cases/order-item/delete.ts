import { OrderItem } from '@prisma/client';

import { IOrderItemRepository } from '@repositories/order-item-repository';
import { IOrderRepository } from '@repositories/order-repository';

interface DeleteOrderItemUseCaseRequest {
  id: string;
}

interface DeleteOrderItemUseCaseResponse {
  orderItem: OrderItem;
}

export class DeleteOrderItemUseCase {
  constructor(
    private orderItemRepository: IOrderItemRepository,
    private orderRepository: IOrderRepository,
  ) {}

  async execute({
    id,
  }: DeleteOrderItemUseCaseRequest): Promise<DeleteOrderItemUseCaseResponse> {
    const orderItem = await this.orderItemRepository.delete(id);

    await this.orderRepository.save(orderItem.orderId, {
      total: {
        decrement: orderItem.subtotal,
      },
    });

    return { orderItem };
  }
}
