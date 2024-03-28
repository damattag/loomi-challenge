import { PrismaConsumerRepository } from '@repositories/prisma/prisma-consumer-repository';
import { GetProfileConsumerUseCase } from '@use-cases/consumer/consumer-list';

export function makeListConsumerUseCase() {
  const consumersRepository = new PrismaConsumerRepository();
  const listConsumerUseCase = new GetProfileConsumerUseCase(
    consumersRepository,
  );

  return listConsumerUseCase;
}
