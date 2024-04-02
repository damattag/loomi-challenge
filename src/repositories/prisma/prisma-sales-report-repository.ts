import prisma from '@database';
import {
  ISalesReportRepository,
  SalesReportResponse,
} from '@repositories/sales-report-repository';

export class PrismaSalesReportRepository implements ISalesReportRepository {
  async getData(): Promise<SalesReportResponse[]> {
    const data: SalesReportResponse[] = await prisma.$queryRawUnsafe(`
      SELECT P.name, SUM(I.quantity) as total_products, SUM(I.subtotal) as total_price
      FROM orders O INNER JOIN order_items I ON O.id = I.order_id
        INNER JOIN products P ON I.product_id = P.id
      GROUP BY P.name, O.status
      HAVING O.status <> 'OPENED'
    `);

    const result = data.map(({ name, total_price, total_products }) => ({
      name,
      total_products: Number(total_products),
      total_price: Number(total_price),
    }));

    return result;
  }

  async register(data: any) {
    const salesReport = await prisma.salesReport.create({ data });

    return salesReport;
  }
}
