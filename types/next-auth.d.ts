import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and
   * received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      accessToken: string
      user: {
        id: number
        name: string
        userRole: {
          id: number
          name: string
        }
      }
      expires: string
    } & DefaultSession['user']
  }
}
