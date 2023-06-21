/* eslint-disable no-param-reassign */
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signIn } from '@/lib/api';

export const authOptions = {
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted,
      // by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        try {
          const response = await signIn({
            email: credentials?.email as string,
            password: credentials?.password as string,
          });
          if (response.success) {
            // Any object returned will be saved in `user` property of the JWT
            return response.success.data;
          }
        } catch (error: any) {
          throw new Error(error?.response?.data?.error?.message || error.message || 'Unknown error');
        }

        // If you return null then an error will be
        // displayed advising the user to check their details.
        return null;

        // You can also Reject this callback with an
        // Error thus the user will be sent to
        // the error page with the error message as a query parameter
        // throw new Error('error_message'); // Redirect to error page
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }: any) {
      if (account) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user = token.user;
      return session;
    },
  },
};

export default NextAuth(authOptions);
