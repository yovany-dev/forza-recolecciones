import { prisma } from '@/lib/prisma';
// import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

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
      async authorize(credentials) {
        const userFound = await prisma.users.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        if (!userFound) throw new Error('Usuario no encontrado.');

        const matchPassword = await bcrypt.compare(
          credentials?.password as string,
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
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id);
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
