import { Request, Response, NextFunction } from 'express';

import { UserRegisterSchema } from '@DTOs/user';
import { makeRegisterUseCase } from '@use-cases/factories/make-register-use-case';
import { makeDeleteUseCase } from '@use-cases/factories/make-delete-user-use-case';

class UserController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = UserRegisterSchema.parse(req.body);

      const registerUseCase = makeRegisterUseCase();

      await registerUseCase.execute(data);

      res.status(201).json({
        message: 'Usuário criado com sucesso!',
      });

      return next();
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const deleteUseCase = makeDeleteUseCase();

      await deleteUseCase.execute(id);

      res.status(200).json({
        message: 'Usuário deletado com sucesso!',
      });

      return next();
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
