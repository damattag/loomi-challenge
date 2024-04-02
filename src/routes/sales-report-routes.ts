import { Router } from 'express';

import SalesReportController from '@http/controllers/sales-report-controller';

const salesReportRouter = Router();

salesReportRouter
  .route('/')
  .post(SalesReportController.generate)
  .get(SalesReportController.list);

salesReportRouter
  .route('/id/:salesReportId')
  .get(SalesReportController.getSalesReport);

salesReportRouter
  .route('/download/:salesReportId')
  .get(SalesReportController.download);

export default salesReportRouter;
