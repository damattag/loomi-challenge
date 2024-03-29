import { $Enums } from '@prisma/client';

declare module 'express' {
  export interface Response {
    locals: {
      sub: string;
      role: $Enums.Role;
    };
  }
}
