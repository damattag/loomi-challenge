import { Router } from 'express';

import ConsumerController from '@http/controllers/consumer-controller';
import { verifyJwt } from '@http/middlewares/verify-jwt';

const consumerRouter = Router();

consumerRouter
  .route('/')
  .post([verifyJwt], ConsumerController.register)
  .get([verifyJwt], ConsumerController.list);
consumerRouter
  .route('/search')
  .get([verifyJwt], ConsumerController.searchByName);
consumerRouter
  .route('/:id')
  .delete([verifyJwt], ConsumerController.delete)
  .get([verifyJwt], ConsumerController.getProfile)
  .patch([verifyJwt], ConsumerController.save);

export default consumerRouter;
