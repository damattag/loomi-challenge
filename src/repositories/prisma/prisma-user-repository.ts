import prisma from '@database';
import { Prisma, User } from '@prisma/client';
import { IUserRepository } from '@repositories/user-repository';

export class PrismaUserRepository implements IUserRepository {
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({ data });

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });

    return user;
  }

  async delete(id: string): Promise<User> {
    const user = await prisma.user.delete({ where: { id } });

    return user;
  }
}
