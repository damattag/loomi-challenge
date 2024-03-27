import { Router } from 'express';

import UserController from '@http/controllers/user-controller';
import { verifyJwt } from '@http/middlewares/verify-jwt';

const userRouter = Router();

userRouter.route('/').post(UserController.register);
userRouter.route('/verify-email').post(UserController.verifyEmail);
userRouter.route('/sessions').post(UserController.authenticate);
userRouter.route('/:id').delete([verifyJwt], UserController.delete);

export default userRouter;
