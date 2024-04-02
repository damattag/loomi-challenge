import { Prisma, SalesReport } from '@prisma/client';

export interface SalesReportResponse {
  name: string;
  total_products: number;
  total_price: number;
}

export interface ListSalesReportFilters {
  maxDate: Date;
  minDate: Date;
}

export interface ISalesReportRepository {
  getData: () => Promise<SalesReportResponse[]>;
  register: (data: Prisma.SalesReportCreateInput) => Promise<SalesReport>;
  findById: (id: string) => Promise<SalesReport | null>;
  findAll: () => Promise<SalesReport[]>;
}
