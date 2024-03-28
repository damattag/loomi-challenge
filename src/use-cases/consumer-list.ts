import { Consumer } from '@prisma/client';

import { IConsumerRepository } from '@repositories/consumer-repository';

interface GetProfileConsumerUseCaseResponse {
  consumers: Consumer[];
}

export class GetProfileConsumerUseCase {
  constructor(private consumerRepository: IConsumerRepository) {}

  async execute(): Promise<GetProfileConsumerUseCaseResponse> {
    const consumers = await this.consumerRepository.findAll();

    return { consumers };
  }
}
