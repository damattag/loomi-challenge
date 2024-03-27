import { z } from 'zod';

export const UserRegisterSchema = z.object({
  name: z.string({
    invalid_type_error: 'O nome precisa ser uma string',
    required_error: 'O nome é obrigatório',
  }),
  email: z
    .string({
      invalid_type_error: 'O e-mail precisa ser uma string',
      required_error: 'O e-mail é obrigatório',
    })
    .email({
      message: 'O e-mail precisa ser válido',
    }),
  password: z.string({
    invalid_type_error: 'A senha precisa ser uma string',
    required_error: 'A senha é obrigatória',
  }),
  role: z
    .enum(['CONSUMER', 'ADMIN'], {
      invalid_type_error: 'O papel precisa ser CONSUMER ou ADMIN',
    })
    .default('CONSUMER'),
});
