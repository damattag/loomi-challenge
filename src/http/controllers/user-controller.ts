import { Request, Response, NextFunction } from 'express';

import { UserRegisterSchema } from '@DTOs/user';
import { makeRegisterUseCase } from '@use-cases/factories/make-register-use-case';

class UserController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = UserRegisterSchema.parse(req.body);

      const registerUseCase = makeRegisterUseCase();

      const user = await registerUseCase.execute(data);

      res.status(201).json({
        data: user,
        message: 'Usuário criado com sucesso!',
      });

      return next();
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
