import { Router } from 'express';
import UserRoutes from './user-routes';

const router = Router();

router.use('/user', UserRoutes);
router.route('/').get((_, res) => {
  res.send('Made by damattag 🚀 (https://github.com/damattag)');
});

export default router;
