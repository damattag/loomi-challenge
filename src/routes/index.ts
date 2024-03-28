import { Router } from 'express';
import UserRoutes from './user-routes';
import ConsumerRoutes from './consumer-routes';

const router = Router();

router.use('/user', UserRoutes);
router.use('/consumer', ConsumerRoutes);
router.route('/').get((_, res) => {
  res.send('Made by damattag 🚀 (https://github.com/damattag)');
});

export default router;
