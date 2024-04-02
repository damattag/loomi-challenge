import { Prisma, SalesReport } from '@prisma/client';

export interface SalesReportResponse {
  name: string;
  total_products: number;
  total_price: number;
}

export interface ISalesReportRepository {
  getData: () => Promise<SalesReportResponse[]>;
  register: (data: Prisma.SalesReportCreateInput) => Promise<SalesReport>;
}
