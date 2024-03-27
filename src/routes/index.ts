import app from '@app';
import { Router } from 'express';

const router = Router();

router.route('/').get((_, res) => {
  res.send('Made by damattag 🚀 (https://github.com/damattag)');
});

export default router;
