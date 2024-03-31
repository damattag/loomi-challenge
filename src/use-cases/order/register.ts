import { $Enums, Order } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

import { IOrderRepository } from '@repositories/order-repository';

interface RegisterOrderUseCaseRequest {
  consumerId: string;
  total: Decimal;
  status?: $Enums.OrderStatus;
}

interface RegisterOrderUseCaseResponse {
  order: Order;
}

export class RegisterOrderUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(
    data: RegisterOrderUseCaseRequest,
  ): Promise<RegisterOrderUseCaseResponse> {
    const order = await this.orderRepository.create(data);

    return { order };
  }
}
