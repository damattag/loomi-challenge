import { $Enums, User } from '@prisma/client';
import { hash } from 'bcryptjs';

import { IUserRepository } from '@repositories/user-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
  role?: $Enums.Role;
}

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    data: RegisterUseCaseRequest,
  ): Promise<RegisterUseCaseResponse> {
    const hashedPassword = await hash(data.password, 8);

    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError();
    }

    const token = Math.floor(Math.random() * 999999).toString();
    const hashedToken = await hash(token, 6);

    const now = new Date();
    const emailVerifyTokenExpiry = now.setHours(now.getHours() + 1);

    const user = await this.userRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role,
      emailVerificationToken: hashedToken,
      emailTokenExpiry: new Date(emailVerifyTokenExpiry),
    });

    return { user };
  }
}
