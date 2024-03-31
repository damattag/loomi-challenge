import { Router } from 'express';
import UserRoutes from './user-routes';
import ConsumerRoutes from './consumer-routes';
import ProductRoutes from './product-routes';
import OrderRoutes from './order-routes';
import OrderItemRoutes from './order-items-routes';

const router = Router();

router.use('/user', UserRoutes);
router.use('/consumer', ConsumerRoutes);
router.use('/product', ProductRoutes);
router.use('/order', OrderRoutes);
router.use('/order-item', OrderItemRoutes);
router.route('/').get((_, res) => {
  res.send('Made by damattag 🚀 (https://github.com/damattag)');
});

export default router;
