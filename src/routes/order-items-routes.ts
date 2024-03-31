import { Router } from 'express';

import OrderItemController from '@http/controllers/order-item-controller';

import { verifyJwt } from '@http/middlewares/verify-jwt';

const orderItemRouter = Router();

orderItemRouter.use(verifyJwt);

orderItemRouter.route('/').post(OrderItemController.register);

orderItemRouter.route('/:orderId').get(OrderItemController.list);

orderItemRouter
  .route('/:orderItemId')
  .get(OrderItemController.delete)
  .patch(OrderItemController.update);

export default orderItemRouter;
