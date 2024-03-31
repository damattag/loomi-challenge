import { OrderItem, Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

import { NotFoundError } from '@errors/not-found-error';

import { IOrderItemRepository } from '@repositories/order-item-repository';
import { IOrderRepository } from '@repositories/order-repository';

interface UpdateOrderItemUseCaseRequest {
  id: string;
  quantity?: number;
  unitPrice?: Decimal;
}

interface UpdateOrderItemUseCaseResponse {
  orderItem: OrderItem;
}

export class UpdateOrderItemUseCase {
  constructor(
    private orderItemRepository: IOrderItemRepository,
    private orderRepository: IOrderRepository,
  ) {}

  async execute({
    id,
    quantity,
    unitPrice,
  }: UpdateOrderItemUseCaseRequest): Promise<UpdateOrderItemUseCaseResponse> {
    const orderItem = await this.orderItemRepository.findById(id);

    if (!orderItem) {
      throw new NotFoundError('Item de pedido não encontrado');
    }

    const subtotal = new Prisma.Decimal(
      Number(unitPrice || orderItem.unitPrice) *
        (quantity || orderItem.quantity),
    );

    const updatedOrderItem = await this.orderItemRepository.save(id, {
      quantity: quantity || orderItem.quantity,
      unitPrice: unitPrice || orderItem.unitPrice,
      subtotal,
    });

    await this.orderRepository.save(updatedOrderItem.orderId, {
      total: {
        increment: Number(subtotal) - Number(orderItem.subtotal),
      },
    });

    return { orderItem: updatedOrderItem };
  }
}
