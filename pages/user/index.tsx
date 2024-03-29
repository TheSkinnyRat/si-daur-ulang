import React, { useEffect } from 'react';
import Dashboard from '@components/templates/user/Dashboard';
import { useRouter } from 'next/router';

export default function App() {
  const router = useRouter();

  useEffect(() => {
    router.push('/user/recycles');
  }, [router]);

  return (
    <Dashboard />
  );
}
