import { PrismaUserRepository } from '@repositories/prisma/prisma-user-repository';
import { DeleteUseCase } from '../user-delete';

export function makeDeleteUseCase() {
  const usersRepository = new PrismaUserRepository();
  const deleteUseCase = new DeleteUseCase(usersRepository);

  return deleteUseCase;
}
