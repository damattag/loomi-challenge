import prisma from '@database';
import { ISalesReportRepository } from '@repositories/sales-report-repository';

export class PrismaSalesReportRepository implements ISalesReportRepository {
  async getData(): Promise<unknown> {
    // const data = await prisma.$queryRawUnsafe(`
    //   SELECT I.product_id, SUM(I.quantity) as total_products, SUM(O.total) as total_order
    //   FROM orders O INNER JOIN order_items I ON O.id = I.order_id
    //   GROUP BY I.product_id, O.status
    //   HAVING O.status <> 'OPENED'
    // `);

    const data = await prisma.$queryRawUnsafe(`
      SELECT COUNT(O.id) as total_orders
      FROM orders O
      WHERE O.status <> 'OPENED'
    `);

    return data;
  }
}
