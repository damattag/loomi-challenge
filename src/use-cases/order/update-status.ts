import { $Enums, Order } from '@prisma/client';

import { IOrderRepository } from '@repositories/order-repository';

interface UpdateStatusOrderUseCaseRequest {
  id: string;
  status: $Enums.OrderStatus;
}

interface UpdateStatusOrderUseCaseResponse {
  order: Order;
}

export class UpdateStatusOrderUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(
    data: UpdateStatusOrderUseCaseRequest,
  ): Promise<UpdateStatusOrderUseCaseResponse> {
    const order = await this.orderRepository.save(data.id, {
      status: data.status,
    });

    return { order };
  }
}
