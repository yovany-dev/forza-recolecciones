import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email: string;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email: string;
    password?: string;
  }
}
