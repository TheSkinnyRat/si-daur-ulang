import React, { useEffect } from 'react';
import Dashboard from '@components/templates/staff/Dashboard';
import { useRouter } from 'next/router';

export default function App() {
  const router = useRouter();

  useEffect(() => {
    router.push('/staff/recycles/request');
  }, [router]);

  return (
    <Dashboard />
  );
}
