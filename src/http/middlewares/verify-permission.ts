import { Request, Response, NextFunction } from 'express';

import { ForbiddenError } from '@errors/forbidden-error';

import { PrismaConsumerRepository } from '@repositories/prisma/prisma-consumer-repository';
import { verifyJwt } from './verify-jwt';

export async function verifyPermission(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userId, consumerId } = req.params;

    await verifyJwt(req, res, next);

    const { sub, role } = res.locals;

    if (role !== 'ADMIN') {
      if (userId && sub !== userId) {
        throw new ForbiddenError();
      }

      if (consumerId) {
        const consumerRepository = new PrismaConsumerRepository();
        const consumer = await consumerRepository.findById(consumerId);

        if (!consumer || consumer.userId !== sub) {
          throw new ForbiddenError();
        }
      }

      if (!userId && !consumerId) {
        throw new ForbiddenError();
      }
    }

    return next();
  } catch (error) {
    return next(error);
  }
}