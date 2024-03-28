import { PrismaUserRepository } from '@repositories/prisma/prisma-user-repository';
import { VerifyEmailUseCase } from '@use-cases/user/user-verify-email';

export function makeUserVerifyEmailUseCase() {
  const usersRepository = new PrismaUserRepository();
  const verifyemailUseCase = new VerifyEmailUseCase(usersRepository);

  return verifyemailUseCase;
}
