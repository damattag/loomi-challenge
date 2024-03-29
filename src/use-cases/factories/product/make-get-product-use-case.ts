import { PrismaProductRepository } from '@repositories/prisma/prisma-product-repository';
import { GetProductUseCase } from '@use-cases/product/get-product';

export function makeProductGetProfileUseCase() {
  const productsRepository = new PrismaProductRepository();
  const getProductProfileUseCase = new GetProductUseCase(productsRepository);

  return getProductProfileUseCase;
}
