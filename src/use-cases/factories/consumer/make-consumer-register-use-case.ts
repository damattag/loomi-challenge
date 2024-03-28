import { PrismaConsumerRepository } from '@repositories/prisma/prisma-consumer-repository';
import { RegisterConsumerUseCase } from '@use-cases/consumer/consumer-register';

export function makeDeleteUseCase() {
  const consumersRepository = new PrismaConsumerRepository();
  const registerUseCase = new RegisterConsumerUseCase(consumersRepository);

  return registerUseCase;
}
