import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Redirecting from '@components/templates/Redirecting';

export default function App() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      if (session.user.user.userRole.id === 0) {
        router.push('/admin');
      }
      if (session.user.user.userRole.id === 1) {
        router.push('/staff');
      }
      if (session.user.user.userRole.id === 2) {
        router.push('/driver');
      }
      if (session.user.user.userRole.id === 3) {
        router.push('/user');
      }
    }
  }, [router, session]);

  return <Redirecting />;
}
