import { Order } from '@prisma/client';
import { OrderFilters } from '@repositories/prisma/prisma-order-repository';

import { IOrderRepository } from '@repositories/order-repository';

interface ListOrderUseCaseResponse {
  orders: Order[];
}

export class ListOrderUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute({
    consumerId,
    maxDate,
    maxPrice,
    minDate,
    minPrice,
  }: OrderFilters): Promise<ListOrderUseCaseResponse> {
    const orders = await this.orderRepository.findAll({
      consumerId,
      maxDate,
      maxPrice,
      minDate,
      minPrice,
    });

    return { orders };
  }
}
