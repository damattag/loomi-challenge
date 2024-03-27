import { $Enums } from '@prisma/client';

declare module 'jsonwebtoken' {
  export interface JwtPayload {
    id: string;
    role: $Enums.Role;
  }
}
