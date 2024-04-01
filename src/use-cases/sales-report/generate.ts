import { SalesReport } from '@prisma/client';

import { ISalesReportRepository } from '@repositories/sales-report-repository';

interface GenerateSalesReportUseCaseRequest {}

interface GenerateSalesReportUseCaseResponse {
  salesReport: SalesReport;
}

export class GenerateSalesReportUseCase {
  constructor(private salesReportRepository: ISalesReportRepository) {}

  async execute(data: GenerateSalesReportUseCaseRequest) {
    const salesReport = await this.salesReportRepository.getData();

    return { salesReport };
  }
}
