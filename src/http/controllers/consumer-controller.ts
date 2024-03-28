import { Request, Response, NextFunction } from 'express';

import { ConsumerRegisterSchema } from '@DTOs/consumer/register';
import { SearchByNameSchema } from '@DTOs/consumer/search-by-name';

import { makeConsumerRegisterUseCase } from '@use-cases/factories/consumer/make-register-use-case';
import { makeListConsumerUseCase } from '@use-cases/factories/consumer/make-list-use-case';
import { makeConsumerGetProfileUseCase } from '@use-cases/factories/consumer/make-get-profile-use-case';
import { makeSearchConsumerByNameUseCase } from '@use-cases/factories/consumer/make-search-by-name-use-case';
import { makeConsumerDeleteUseCase } from '@use-cases/factories/consumer/make-delete-use-case';
import { makeConsumerUpdateUseCase } from '@use-cases/factories/consumer/make-update-use-case';
import { ConsumerUpdateSchema } from '@DTOs/consumer/update';

class ConsumerController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = ConsumerRegisterSchema.parse(req.body);

      const registerUseCase = makeConsumerRegisterUseCase();

      await registerUseCase.execute(data);

      res.status(201).json({
        message: 'Cliente criado com sucesso!',
      });

      return next();
    } catch (error) {
      next(error);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const listUseCase = makeListConsumerUseCase();

      const { consumers } = await listUseCase.execute();

      if (consumers.length === 0) {
        res.status(204).json({
          message: 'Nenhum cliente foi criado.',
        });

        return next();
      }

      res.status(200).json({
        data: consumers,
        message: 'Listagem de clientes.',
      });

      return next();
    } catch (error) {
      next(error);
    }
  }

  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const getProfileUseCase = makeConsumerGetProfileUseCase();

      const { consumer } = await getProfileUseCase.execute(id);

      res.status(200).json({
        data: consumer,
        message: 'Cliente encontrado.',
      });

      return next();
    } catch (error) {
      next(error);
    }
  }

  async searchByName(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = SearchByNameSchema.parse(req.query);

      const listUseCase = makeSearchConsumerByNameUseCase();

      const { consumers } = await listUseCase.execute({ name });

      if (consumers.length === 0) {
        res.status(204).json({
          message: 'Nenhum cliente foi encontrado.',
        });

        return next();
      }

      res.status(200).json({
        data: consumers,
        message: 'Listagem de clientes filtrada por nome.',
      });

      return next();
    } catch (error) {
      next(error);
    }
  }

  async save(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = ConsumerUpdateSchema.parse(req.body);

      const updateUseCase = makeConsumerUpdateUseCase();

      await updateUseCase.execute({
        ...data,
        id,
      });

      res.status(200).json({
        message: 'Cliente atualizado com sucesso.',
      });

      return next();
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const deleteUseCase = makeConsumerDeleteUseCase();

      await deleteUseCase.execute(id);

      res.status(200).json({
        message: 'Cliente deletado com sucesso.',
      });

      return next();
    } catch (error) {
      next(error);
    }
  }
}

export default new ConsumerController();
