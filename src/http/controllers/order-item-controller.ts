import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';

import { OrderRegisterSchema } from '@DTOs/order/register';
import { OrderSearchByFiltersSchema } from '@DTOs/order/search-by-filters';

import { makeRegisterOrderUseCase } from '@use-cases/factories/order/make-register-use-case';
import { makeListOrdersUseCase } from '@use-cases/factories/order/make-list-use-case';
import { makeGetOrderUseCase } from '@use-cases/factories/order/make-get-order-use-case';
import { makeUpdateOrderUseCase } from '@use-cases/factories/order/make-update-status-use-case';
import { OrderUpdateSchema } from '@DTOs/order/update';

class OrderItemController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { consumerId } = OrderRegisterSchema.parse(req.body);

      const registerUseCase = makeRegisterOrderUseCase();

      await registerUseCase.execute({ consumerId });

      res.status(201).json({
        message: 'Pedido criado com sucesso!',
      });

      return next();
    } catch (error) {
      next(error);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      return next();
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      return next();
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      return next();
    } catch (error) {
      next(error);
    }
  }
}

export default new OrderItemController();
