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

    const totalProducts = salesReport.reduce(
      (acc, curr) => acc + curr.total_products,
      0,
    );

    const totalPrice = salesReport.reduce(
      (acc, curr) => acc + curr.total_price,
      0,
    );

    const salesInformation = await this.salesReportRepository.register({
      period: new Date(),
      products: totalProducts,
      total: totalPrice,
      path: 'sales-report.csv',
    });

    return { salesInformation };
  }
}
