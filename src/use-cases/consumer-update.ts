import { Consumer } from '@prisma/client';

import { IConsumerRepository } from '@repositories/consumer-repository';

interface UpdateConsumerUseCaseRequest {
  id: string;
  userId: string;
  fullName: string;
  contact: string;
  address: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface UpdateConsumerUseCaseResponse {
  consumer: Consumer;
}

export class UpdateConsumerUseCase {
  constructor(private consumerRepository: IConsumerRepository) {}

  async execute(
    data: UpdateConsumerUseCaseRequest,
  ): Promise<UpdateConsumerUseCaseResponse> {
    const consumer = await this.consumerRepository.save(data);

    return { consumer };
  }
}
