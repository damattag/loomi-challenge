import { Consumer } from '@prisma/client';

import { IConsumerRepository } from '@repositories/consumer-repository';
import { ConsumerAlreadyExistsError } from '@use-cases/errors/consumer-already-exists-error';

interface RegisterConsumerUseCaseRequest {
  fullName: string;
  userId: string;
  contact: string;
  address: string;
  status?: boolean;
}

interface RegisterConsumerUseCaseResponse {
  consumer: Consumer;
}

export class RegisterConsumerUseCase {
  constructor(private consumerRepository: IConsumerRepository) {}

  async execute(
    data: RegisterConsumerUseCaseRequest,
  ): Promise<RegisterConsumerUseCaseResponse> {
    const consumerAlreadyExists = await this.consumerRepository.findByUserId(
      data.userId,
    );

    if (consumerAlreadyExists) {
      throw new ConsumerAlreadyExistsError();
    }

    const consumer = await this.consumerRepository.create(data);

    return { consumer };
  }
}
