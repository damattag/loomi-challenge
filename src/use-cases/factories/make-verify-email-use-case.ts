import { PrismaUserRepository } from '@repositories/prisma/prisma-user-repository';
import { VerifyEmailUseCase } from '../verify-email';

export function makeVerifyEmailUseCase() {
  const usersRepository = new PrismaUserRepository();
  const verifyemailUseCase = new VerifyEmailUseCase(usersRepository);

  return verifyemailUseCase;
}
