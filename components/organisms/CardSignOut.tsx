import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import Button from '@components/atoms/Button';

export default function App(): JSX.Element | null {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <div className="rounded shadow border bg-slate-100 dark:bg-zinc-800 border-slate-200 dark:border-zinc-900 mb-2">
      <div className="p-1 sm:p-2 text-center">
        <div className="text-slate-700 dark:text-slate-200">
          Logged in as:
          <span className="ml-1 text-emerald-500">{session.user.user.name}</span>
          <br />
          Role:
          <span className="ml-1 text-emerald-500">{session.user.user.userRole.name}</span>
          <br />
          <Button
            variant="danger"
            size="sm"
            className="px-2 py-1 mt-2 rounded"
            onClick={() => signOut()}
          >
            <i className="fa-solid fa-sign-out mr-1" />
            LogOut
          </Button>
        </div>
      </div>
    </div>
  );
}
