import { Prisma, Consumer } from '@prisma/client';

export interface IConsumerRepository {
  create: (data: Prisma.ConsumerCreateInput) => Promise<Consumer>;
  findByEmail: (email: string) => Promise<Consumer | null>;
}
