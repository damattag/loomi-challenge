import { ZodError, z } from 'zod';

export const ProductSearchByFiltersSchema = z
  .object({
    name: z.string(),
    maxPrice: z.number(),
    minPrice: z.number(),
    stock: z.number(),
  })
  .partial()
  .refine((data) => {
    if (data.maxPrice && data.minPrice && data.maxPrice < data.minPrice) {
      throw new Error('O preço máximo não pode ser menor que o preço mínimo');
    }
  });
