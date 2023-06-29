import React, { useState, useEffect } from 'react';
import Alert, { IProps as IAlertProps } from '@/components/atoms/Alert';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Button from '@/components/atoms/Button';
import Link from '@/components/atoms/Link';
import {
  userGetPoint,
  userAddPointWithdraw,
  IUserAddPointWithdrawData,
} from '@/lib/api';

export default function App(): JSX.Element {
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
  });
  const [alert, setAlert] = useState<IAlertProps>({
    message: 'Withdraw point',
    isLoading: false,
  });
  const [point, setPoint] = useState<any>();
  const [inputValue, setInputValue] = useState<IUserAddPointWithdrawData>({
    amount: 0,
    type: '',
    typeValue: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const formAddPointWithdrawHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setAlert({
      type: 'info',
      message: 'Adding new withdraw point request ...',
      isLoading: true,
    });
    try {
      const response = await userAddPointWithdraw(
        session!.user.accessToken,
        inputValue,
      );
      if (response.success) {
        setAlert({
          type: 'success',
          message: response.success.data.message,
          isLoading: false,
        });
        router.push('/user/point/withdraws');
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

  const getPointHandler = async () => {
    setIsLoading(true);
    setAlert({
      type: 'info',
      message: 'Getting data ...',
      isLoading: true,
    });
    try {
      const response = await userGetPoint(
        session?.user.accessToken as string,
      );
      if (response.success) {
        setPoint(response.success.data);
        setAlert({
          message: 'Withdraw point',
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
    const initialGetRecycle = async () => {
      setIsLoading(true);
      setAlert({
        type: 'info',
        message: 'Getting data ...',
        isLoading: true,
      });
      try {
        const response = await userGetPoint(
          session?.user.accessToken as string,
        );
        if (response.success) {
          setPoint(response.success.data);
          setAlert({
            message: 'Withdraw point',
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
    if (session?.user.accessToken) initialGetRecycle();
  }, [session?.user.accessToken]);

  return (
    <div>
      <div className="bg-white dark:bg-zinc-800 border dark:border-zinc-700 relative shadow-md sm:rounded-lg overflow-hidden">
        <div className="m-2 mb-3">
          <Button
            variant="primary"
            size="xs"
            disabled={isLoading}
            onClick={getPointHandler}
            className="px-2 py-1 rounded-full mr-1"
          >
            <i className="fa-solid fa-rotate mr-1" />
            Refresh
          </Button>
          <Link
            href="/user/point/withdraws"
            size="xs"
            className="mb-3 px-2 py-1 rounded-full"
          >
            <i className="fa-solid fa-clock-rotate-left mr-1" />
            Withdraw History
          </Link>
        </div>
        <div className="px-4 py-3 text-xs text-slate-700 uppercase font-bold bg-slate-100 dark:bg-zinc-700 dark:text-zinc-300">
          <Alert type={alert.type} message={alert.message} isLoading={alert.isLoading} />
        </div>
        <div className="block m-3 text-lg text-slate-700 dark:text-slate-200">
          <span>Current Point: </span>
          <span className="font-semibold">{Number(point?.amount?.split('.')[0] || 0).toLocaleString('id-ID')}</span>
        </div>
        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
        <form className="grid grid-cols-none md:grid-cols-12 gap-5 m-3" onSubmit={formAddPointWithdrawHandler}>
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
            <span className="text-xs text-slate-700 dark:text-slate-200">
              Min withdraw point:
              {' '}
              {Number(10000).toLocaleString('id-ID')}
            </span>
            <div className="text-xs text-slate-700 dark:text-slate-200">
              Max withdraw point:
              {' '}
              {Number(point?.amount?.split('.')[0] || 0).toLocaleString('id-ID')}
            </div>
          </label>
          <label className="block md:col-start-1 lg:col-start-1 xl:col-start-1 col-span-full md:col-span-4 lg:col-span-3 xl:col-span-2" htmlFor="userRoleId">
            <span className="text-slate-700 dark:text-slate-200">Withdraw to</span>
            <select
              id="userRoleId"
              required
              disabled={isLoading}
              defaultValue=""
              onChange={(e) => setInputValue({
                ...inputValue,
                type: e.target.value,
              })}
              className="w-full mt-1 rounded-md border dark:bg-zinc-600 dark:text-slate-100 border-slate-300 dark:border-zinc-600 px-3 py-1 placeholder-slate-300 dark:placeholder-zinc-200 placeholder-opacity-50 outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:ring-zinc-200 disabled:opacity-50"
            >
              <option disabled className="hidden" value="">-- Select --</option>
              <option value="dana">Dana</option>
              <option value="gopay">Gopay</option>
              <option value="shopee pay">Shopee Pay</option>
            </select>
          </label>
          <label className="block md:col-start-1 lg:col-start-1 xl:col-start-1 col-span-full md:col-span-6 lg:col-span-5 xl:col-span-4" htmlFor="typeValue">
            <span className="text-slate-700 dark:text-slate-200">No. Telp / VA / Rek</span>
            <input
              type="number"
              id="typeValue"
              required
              disabled={isLoading}
              value={inputValue.typeValue}
              onChange={(e) => setInputValue({ ...inputValue, typeValue: e.target.value })}
              className="w-full mt-1 rounded-md border dark:bg-zinc-600 dark:text-slate-100 border-slate-300 dark:border-zinc-600 px-3 py-1 placeholder-slate-600 dark:placeholder-zinc-200 placeholder-opacity-50 dark:placeholder-opacity-50 outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:ring-zinc-200 disabled:opacity-50"
            />
          </label>
          <div className="mt-2 md:col-start-1 lg:col-start-1 xl:col-start-1 col-span-full md:col-span-4 lg:col-span-3 xl:col-span-2">
            <Button
              type="submit"
              size="sm"
              disabled={isLoading}
              className="w-full rounded-md p-1"
            >
              Withdraw Request
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
