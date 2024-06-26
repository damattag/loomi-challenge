import { z } from 'zod';

const envSchema = z.object({
  SERVER_PORT: z.coerce.number(),
  NODE_ENV: z.enum(['development', 'production', 'test']),

  JWT_SECRET: z.string(),

  EMAIL: z.string(),
  EMAIL_PASSWORD: z.string(),

  DATABASE_URL: z.string(),
});

const devEnvSchema = envSchema.extend({
  DATABASE_TYPE: z.string(),
  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.coerce.number(),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_DB: z.string(),
});

const envValidation =
  process.env.NODE_ENV !== 'production'
    ? devEnvSchema.safeParse(process.env)
    : envSchema.safeParse(process.env);

if (!envValidation.success) {
  console.error('Invalid environment variables', envValidation.error.format());

  throw new Error('Invalid environment variables');
}

declare global {
  namespace NodeJS {
    interface ProcessEnv
      extends Record<keyof z.infer<typeof envSchema>, string> {}
  }
}

export default envValidation.data;
