export const orderItemSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    orderId: { type: 'string' },
    productId: { type: 'string' },
    quantity: { type: 'number' },
    unitPrice: { type: 'number' },
    subtotal: { type: 'number' },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
  },
  required: [
    'id',
    'orderId',
    'productId',
    'quantity',
    'unitPrice',
    'subtotal',
    'createdAt',
    'updatedAt',
  ],
};
