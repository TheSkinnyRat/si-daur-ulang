import React, { useEffect } from 'react';
import Dashboard from '@components/templates/driver/Dashboard';
import { useRouter } from 'next/router';

export default function App() {
  const router = useRouter();

  useEffect(() => {
    router.push('/driver');
  }, [router]);

  return (
    <Dashboard />
  );
}
