import { $Enums } from '@prisma/client';

export const orderSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    consumerId: { type: 'string' },
    status: {
      type: 'string',
      enum: $Enums.OrderStatus,
    },
    total: { type: 'number' },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
  },
  required: ['id', 'consumerId', 'status', 'total', 'createdAt', 'updatedAt'],
} as const;
