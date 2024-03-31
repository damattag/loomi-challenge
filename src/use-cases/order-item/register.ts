import { ForbiddenError } from '@errors/forbidden-error';
import { UnauthorizedError } from '@errors/unauthorized-error';
import { OrderItem } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

import { IOrderItemRepository } from '@repositories/order-item-repository';
import { IOrderRepository } from '@repositories/order-repository';

interface RegisterOrderItemUseCaseRequest {
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: Decimal;
}

interface RegisterOrderItemUseCaseResponse {
  orderItem: OrderItem;
}

export class RegisterOrderItemUseCase {
  constructor(
    private orderItemRepository: IOrderItemRepository,
    private orderRepository: IOrderRepository,
  ) {}

  async execute(
    data: RegisterOrderItemUseCaseRequest,
  ): Promise<RegisterOrderItemUseCaseResponse> {
    const order = await this.orderRepository.findById(data.orderId);

    if (!order) {
      throw new Error('Pedido não encontrado');
    }

    if (order.status !== 'OPENED') {
      throw new ForbiddenError(
        'Não é possível adicionar um item a um pedido fechado',
      );
    }
    const subtotal = Number(data.unitPrice) * data.quantity;

    const orderItem = await this.orderItemRepository.create({
      orderId: data.orderId,
      productId: data.productId,
      quantity: data.quantity,
      unitPrice: data.unitPrice,
      subtotal,
    });

    await this.orderRepository.save(data.orderId, {
      total: {
        increment: subtotal,
      },
    });

    return { orderItem };
  }
}
