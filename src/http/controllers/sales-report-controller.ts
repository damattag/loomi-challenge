import { Request, Response, NextFunction } from 'express';

import { makeSalesReportUseCase } from '@use-cases/factories/sales-report/make-generate-use-case';

class SalesReportController {
  async generate(req: Request, res: Response, next: NextFunction) {
    try {
      const generateUseCase = makeSalesReportUseCase();
      const data = await generateUseCase.execute({});

      res.status(200).json({ data });

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new SalesReportController();
