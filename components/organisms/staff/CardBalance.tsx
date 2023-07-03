import React, { useState, useEffect } from 'react';
import Alert, { IProps as IAlertProps } from '@/components/atoms/Alert';
import { useSession } from 'next-auth/react';
import Button from '@/components/atoms/Button';
import Link from '@/components/atoms/Link';
import {
  staffGetBalance,
} from '@/lib/api';

export default function App(): JSX.Element {
  const { data: session } = useSession({
    required: true,
  });
  const [alert, setAlert] = useState<IAlertProps>({
    message: 'Viewing balance',
    isLoading: false,
  });
  const [point, setPoint] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  const getBalanceHandler = async () => {
    setIsLoading(true);
    setAlert({
      type: 'info',
      message: 'Getting data ...',
      isLoading: true,
    });
    try {
      const response = await staffGetBalance(
        session?.user.accessToken as string,
      );
      if (response.success) {
        setPoint(response.success.data);
        setAlert({
          message: 'Viewing balance',
        });
        setIsLoading(false);
      }
    } catch (error: any) {
      setAlert({
        type: 'danger',
        message: `Error: ${error?.response?.data?.error?.message || error?.message || 'Unknown error'}`,
      });
    }
  };

  useEffect(() => {
    const initialGetBalance = async () => {
      setIsLoading(true);
      setAlert({
        type: 'info',
        message: 'Getting data ...',
        isLoading: true,
      });
      try {
        const response = await staffGetBalance(
          session?.user.accessToken as string,
        );
        if (response.success) {
          setPoint(response.success.data);
          setAlert({
            message: 'Viewing balance',
          });
          setIsLoading(false);
        }
      } catch (error: any) {
        setAlert({
          type: 'danger',
          message: `Error: ${error?.response?.data?.error?.message || error?.message || 'Unknown error'}`,
        });
      }
    };
    if (session?.user.accessToken) initialGetBalance();
  }, [session?.user.accessToken]);

  return (
    <div>
      <div className="bg-white dark:bg-zinc-800 border dark:border-zinc-700 relative shadow-md sm:rounded-lg overflow-hidden">
        <div className="m-2 mb-3">
          <Button
            variant="primary"
            size="xs"
            disabled={isLoading}
            onClick={getBalanceHandler}
            className="px-2 py-1 rounded-full ml-1"
          >
            <i className="fa-solid fa-rotate mr-1" />
            Refresh
          </Button>
        </div>
        <div className="px-4 py-3 text-xs text-slate-700 uppercase font-bold bg-slate-100 dark:bg-zinc-700 dark:text-zinc-300">
          <Alert type={alert.type} message={alert.message} isLoading={alert.isLoading} />
        </div>
        <div className="block m-3 text-lg text-slate-700 dark:text-slate-200">
          <span>Current Balance: </span>
          <span className="font-semibold">{Number(point?.amount?.split('.')[0] || 0).toLocaleString('id-ID')}</span>
        </div>
        <Link
          href="/staff/balance/add"
          size="sm"
          className="inline-block mb-3 ml-3 mr-1 px-2 py-1 rounded"
        >
          <i className="fa-solid fa-plus mr-1" />
          Add Balance
        </Link>
        <Link
          href="/staff/balance/histories"
          size="sm"
          className="inline-block mb-3 px-2 py-1 rounded"
        >
          <i className="fa-solid fa-clock-rotate-left mr-1" />
          Balance History
        </Link>
      </div>
    </div>
  );
}
