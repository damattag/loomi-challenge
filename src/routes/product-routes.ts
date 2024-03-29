import { Router } from 'express';

import ProductController from '@http/controllers/product-controller';
import { verifyJwt } from '@http/middlewares/verify-jwt';

const productRouter = Router();

productRouter
  .route('/')
  .post([verifyJwt], ProductController.register)
  .get([verifyJwt], ProductController.list);
productRouter
  .route('/:id')
  .delete([verifyJwt], ProductController.delete)
  .get([verifyJwt], ProductController.getProduct)
  .patch([verifyJwt], ProductController.save);

export default productRouter;
