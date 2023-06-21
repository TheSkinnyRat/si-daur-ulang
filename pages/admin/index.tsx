import React, { useEffect } from 'react';
import Dashboard from '@components/templates/admin/Dashboard';
import { useRouter } from 'next/router';

export default function App() {
  const router = useRouter();

  useEffect(() => {
    router.push('/admin/users');
  }, [router]);

  return (
    <Dashboard />
  );
}
