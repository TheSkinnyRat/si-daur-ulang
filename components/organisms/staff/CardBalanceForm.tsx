import React, { useState } from 'react';
import Alert, { IProps as IAlertProps } from '@/components/atoms/Alert';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from '@/components/atoms/Link';
import Button from '@/components/atoms/Button';
import {
  staffUpdateBalance,
  IStaffUpdateBalanceData,
} from '@/lib/api';

export default function App(): JSX.Element {
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
  });
  const [alert, setAlert] = useState<IAlertProps>({
    message: 'Add balance',
    isLoading: false,
  });
  const [inputValue, setInputValue] = useState<IStaffUpdateBalanceData>({
    amount: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const formUpdateBalanceHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setAlert({
      type: 'info',
      message: 'Updating balance...',
      isLoading: true,
    });
    try {
      const response = await staffUpdateBalance(
        session!.user.accessToken,
        inputValue,
      );
      if (response.success) {
        setAlert({
          type: 'success',
          message: response.success.data.message,
          isLoading: false,
        });
        router.push('/staff/balance');
      }
    } catch (error: any) {
      setIsLoading(false);
      setAlert({
        type: 'danger',
        message: `Error: ${error?.response?.data?.error?.message || error?.message || 'Unknown error'}`,
        isLoading: false,
      });
    }
  };

  return (
    <div>
      <div className="bg-white dark:bg-zinc-800 border dark:border-zinc-700 relative shadow-md sm:rounded-lg overflow-hidden">
        <div className="m-2 mb-3">
          <Link
            href="/staff/balance"
            variant="link"
            size="xs"
            className="px-2 py-1 rounded-full transition-none"
          >
            <i className="fa-solid fa-arrow-left mr-1" />
            View Data
          </Link>
        </div>
        <div className="px-4 py-3 text-xs text-slate-700 uppercase font-bold bg-slate-100 dark:bg-zinc-700 dark:text-zinc-300">
          <Alert type={alert.type} message={alert.message} isLoading={alert.isLoading} />
        </div>
        <form className="grid grid-cols-none md:grid-cols-12 gap-5 m-3" onSubmit={formUpdateBalanceHandler}>
          <label className="block col-span-full md:col-span-6 lg:col-span-5 xl:col-span-4" htmlFor="amount">
            <span className="text-slate-700 dark:text-slate-200">Amount</span>
            <input
              type="number"
              id="amount"
              required
              disabled={isLoading}
              value={inputValue.amount}
              onChange={(e) => setInputValue({ ...inputValue, amount: Number(e.target.value) })}
              className="w-full mt-1 rounded-md border dark:bg-zinc-600 dark:text-slate-100 border-slate-300 dark:border-zinc-600 px-3 py-1 placeholder-slate-600 dark:placeholder-zinc-200 placeholder-opacity-50 dark:placeholder-opacity-50 outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:ring-zinc-200 disabled:opacity-50"
            />
          </label>
          <label className="block md:col-start-1 lg:col-start-1 xl:col-start-1 col-span-full md:col-span-6 lg:col-span-5 xl:col-span-4" htmlFor="description">
            <span className="text-slate-700 dark:text-slate-200">Description (Optional)</span>
            <textarea
              id="description"
              rows={3}
              disabled={isLoading}
              value={inputValue.description}
              onChange={(e) => setInputValue({ ...inputValue, description: e.target.value })}
              className="w-full mt-1 rounded-md border dark:bg-zinc-600 dark:text-slate-100 border-slate-300 dark:border-zinc-600 px-3 py-1 placeholder-slate-300 dark:placeholder-zinc-200 placeholder-opacity-50 outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:ring-zinc-200 disabled:opacity-50"
            />
          </label>
          <div className="mt-2 md:col-start-1 lg:col-start-1 xl:col-start-1 col-span-full md:col-span-4 lg:col-span-3 xl:col-span-2">
            <Button
              type="submit"
              size="sm"
              disabled={isLoading}
              className="w-full rounded-md p-1"
            >
              Add Balance
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
