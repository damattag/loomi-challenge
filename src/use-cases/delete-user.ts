import { $Enums, User } from '@prisma/client';
import { hash } from 'bcryptjs';

import { IUserRepository } from '@repositories/user-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

interface DeleteUseCaseResponse {
  user: User;
}

export class DeleteUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string): Promise<DeleteUseCaseResponse> {
    const user = await this.userRepository.delete(id);

    return { user };
  }
}
