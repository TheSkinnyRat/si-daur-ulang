import React from 'react';
import { useSession } from 'next-auth/react';
import AdminDashboard from '@components/templates/admin/Dashboard';
import StaffDashboard from '@components/templates/staff/Dashboard';
import DriverDashboard from '@components/templates/driver/Dashboard';
import UserDashboard from '@components/templates/user/Dashboard';
import Redirecting from '@components/templates/Redirecting';

export default function App() {
  const { data: session } = useSession(
    { required: true },
  );

  if (session && session.user.user.userRole.id === 0) {
    return <AdminDashboard content="profile" />;
  }

  if (session && session.user.user.userRole.id === 1) {
    return <StaffDashboard content="profile" />;
  }

  if (session && session.user.user.userRole.id === 2) {
    return <DriverDashboard content="profile" />;
  }

  if (session && session.user.user.userRole.id === 3) {
    return <UserDashboard content="profile" />;
  }

  return (
    <Redirecting />
  );
}
