import { consumerPaths } from './paths/consumer-paths';
import { productPaths } from './paths/product-paths';
import { userPaths } from './paths/user-paths';
import { consumerSchema } from './schemas/consumer-schema';
import { productSchema } from './schemas/product-schema';
import { userSchema } from './schemas/user-schema';

export default {
  openapi: '3.0.0',
  info: {
    title: 'Loomi Challenge API.',
    description: 'API for back challenge of Loomi.',
    version: '1.0.0',
  },

  servers: [
    {
      url: 'http://localhost:3001',
      description: 'Local Server',
    },
  ],

  paths: {
    ...userPaths,
    ...consumerPaths,
    ...productPaths,
  },

  components: {
    schemas: {
      ...userSchema,
      ...consumerSchema,
      ...productSchema,
    },

    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },

    security: {
      bearerAuth: [],
    },
  },
};
