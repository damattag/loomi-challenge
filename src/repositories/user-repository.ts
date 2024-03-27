import { Prisma, type User } from '@prisma/client';

export interface IUserRepository {
  create: (data: Prisma.UserCreateInput) => Promise<User>;
  findByEmail: (email: string) => Promise<User | null>;
  delete: (id: string) => Promise<User>;
}
