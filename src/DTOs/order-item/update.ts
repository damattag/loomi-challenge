import { z } from 'zod';

export const OrderItemUpdateSchema = z.object({
  quantity: z.number({
    invalid_type_error: 'A quantidade deve ser um número.',
  }),
  unitPrice: z.number({
    invalid_type_error: 'O preço unitário deve ser um número.',
  }),
});
