import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';
import { prisma } from '@/client/lib/prisma';
import { verifyPassword } from '../utils/password';
import { User as PrismaUser } from '@prisma/client';

declare module 'next-auth' {
  interface User {
    role: PrismaUser['role'];
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
    maxAge: 6000, // 1 minutes
  },
  jwt: {
    maxAge: 6000, // 1 minutes
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          select: {
            id: true,
            email: true,
            password: true,
            name: true,
            role: true,
          },
        });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordCorrect = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) {
          return null;
        }

        return {
          id: user.id.toString(), // Convert Int to String karena NextAuth mengharapkan string
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          email: token.email,
          name: token.name,
          role: token.role,
        },
      };
    },
  },
  pages: {
    signIn: '/login',
  },
};
