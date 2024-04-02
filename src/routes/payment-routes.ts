import { Router } from 'express';

import PaymentController from '@http/controllers/payment-controller';

const paymentRouter = Router();

paymentRouter.route('/:orderId').patch(PaymentController.pay);

export default paymentRouter;
