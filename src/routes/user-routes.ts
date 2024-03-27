import UserController from '@http/controllers/user-controller';
import { Router } from 'express';

const userRouter = Router();

userRouter.route('/').post(UserController.register);

export default userRouter;
