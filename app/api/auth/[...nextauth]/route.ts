import { prisma } from '@/lib/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const bcrypt = require('bcrypt');

export const authOptions: AuthOptions = {
  // adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'correo',
          type: 'email',
          placeholder: 'admin@forzadelivery.com',
        },
        password: {
          label: 'contrasena',
          type: 'password',
          placeholder: '*****',
        },
      },
      async authorize(credentials, req) {
        const userFound = await prisma.users.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        if (!userFound) throw new Error('Usuario no encontrado.');

        const matchPassword = await bcrypt.compare(
          credentials?.password,
          userFound?.password
        );
        if (!matchPassword) throw new Error('Contraseña incorrecto.');

        return {
          id: String(userFound.id),
          name: userFound.name,
          email: userFound.email,
          image: userFound.avatar,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      if (user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
