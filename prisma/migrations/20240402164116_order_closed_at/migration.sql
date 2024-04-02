-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "closed_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "sales_reports" ALTER COLUMN "period" SET DATA TYPE TEXT;
