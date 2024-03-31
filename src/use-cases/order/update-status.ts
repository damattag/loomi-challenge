import { $Enums, Order } from '@prisma/client';

import { IOrderRepository } from '@repositories/order-repository';

interface UpdateOrderUseCaseRequest {
  id: string;
  status: $Enums.OrderStatus;
}

interface UpdateOrderUseCaseResponse {
  order: Order;
}

export class UpdateOrderUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(
    data: UpdateOrderUseCaseRequest,
  ): Promise<UpdateOrderUseCaseResponse> {
    const order = await this.orderRepository.save(data.id, {
      status: data.status,
    });

    return { order };
  }
}
