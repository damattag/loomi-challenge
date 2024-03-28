import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { UserRegisterSchema } from '@DTOs/user-register';
import { VerifyEmailSchema } from '@DTOs/verify-email';
import { AuthenticateSchema } from '@DTOs/authenticate';

class UserController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      return next();
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
