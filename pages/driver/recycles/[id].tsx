import React from 'react';
import Dashboard from '@components/templates/driver/Dashboard';
import { useRouter } from 'next/router';

export default function App() {
  const router = useRouter();
  const { query } = router;
  return (
    <Dashboard content="recyclesView" query={query} />
  );
}
