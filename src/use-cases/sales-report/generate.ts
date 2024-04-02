import { SalesReport } from '@prisma/client';
import { json2csv } from 'json-2-csv';
import fs from 'node:fs';
import * as url from 'url';

import { ISalesReportRepository } from '@repositories/sales-report-repository';

interface GenerateSalesReportUseCaseResponse {
  salesReport: SalesReport;
}

export class GenerateSalesReportUseCase {
  constructor(private salesReportRepository: ISalesReportRepository) {}

  async execute(): Promise<GenerateSalesReportUseCaseResponse> {
    const salesReportData = await this.salesReportRepository.getData();

    const totalProducts = salesReportData.reduce(
      (acc, curr) => acc + curr.total_products,
      0,
    );

    const totalPrice = salesReportData.reduce(
      (acc, curr) => acc + curr.total_price,
      0,
    );

    const csvData = json2csv(salesReportData, {
      delimiter: { field: ';' },
    });

    const outDir = url.fileURLToPath(
      new URL('../../../sales-reports', import.meta.url),
    );

    const path = `${outDir}/${new Date().toISOString()}_sales_report.csv`;

    fs.writeFileSync(path, csvData);

    const salesReport = await this.salesReportRepository.register({
      period: new Date(),
      products: totalProducts,
      total: totalPrice,
      path,
    });

    return { salesReport };
  }
}
