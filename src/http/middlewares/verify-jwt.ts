import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { UnauthorizedError } from '@use-cases/errors/unauthorized-error';
import { PrismaUserRepository } from '@repositories/prisma/prisma-user-repository';

export async function verifyJwt(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userRepository = new PrismaUserRepository();
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedError();
    }

    const [, token] = authHeader.split(' ');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded === typeof 'string') {
      throw new UnauthorizedError();
    }

    const { id, role } = decoded as JwtPayload;

    const user = await userRepository.findById(id);

    if (!user || user.role !== role) {
      throw new UnauthorizedError();
    }

    return next();
  } catch (error) {
    return next(error);
  }
}
