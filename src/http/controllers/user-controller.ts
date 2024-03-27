import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { UserRegisterSchema } from '@DTOs/user-register';
import { VerifyEmailSchema } from '@DTOs/verify-email';
import { AuthenticateSchema } from '@DTOs/authenticate';

import { makeVerifyEmailUseCase } from '@use-cases/factories/make-verify-email-use-case';
import { makeRegisterUseCase } from '@use-cases/factories/make-register-use-case';
import { makeDeleteUseCase } from '@use-cases/factories/make-delete-user-use-case';
import { makeAuthenticateUseCase } from '@use-cases/factories/make-authenticate-use-case';

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

  async verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, token } = VerifyEmailSchema.parse(req.body);

      const verifyEmailUseCase = makeVerifyEmailUseCase();

      await verifyEmailUseCase.execute({
        email,
        token,
      });

      res.status(200).json({
        message: 'E-mail verificado com sucesso!',
      });

      return next();
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', id);

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

  async authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const data = AuthenticateSchema.parse(req.body);

      const authenticateUseCase = makeAuthenticateUseCase();

      const { user } = await authenticateUseCase.execute(data);

      const accessToken = jwt.sign(
        {
          sub: user.id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '1d',
        },
      );

      const {
        password,
        emailTokenExpiry,
        emailVerificationToken,
        emailVerified,
        createdAt,
        updatedAt,
        ...userWithoutPassword
      } = user;

      res.status(200).json({
        data: {
          user: userWithoutPassword,
          accessToken,
        },
        message: 'Usuário autenticado com sucesso!',
      });

      return next();
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
