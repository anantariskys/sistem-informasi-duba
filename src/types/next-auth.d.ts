import { Role } from '@prisma/client';

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      role: Role;
    };
  }
  interface Jwt {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      role: Role;
    };
  }
}
