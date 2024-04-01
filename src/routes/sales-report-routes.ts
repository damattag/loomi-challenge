import { Router } from 'express';

import SalesReportController from '@http/controllers/sales-report-controller';

const salesReportRouter = Router();

salesReportRouter.route('/').get(SalesReportController.generate);

export default salesReportRouter;
