import React, { useState } from 'react';
import Alert, { IProps as IAlertProps } from '@/components/atoms/Alert';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from '@/components/atoms/Link';
import Button from '@/components/atoms/Button';
import {
  userAddRecycle,
  IUserAddRecycleData,
} from '@/lib/api';

export default function App(): JSX.Element {
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
  });
  const [alert, setAlert] = useState<IAlertProps>({
    message: 'Request new recycle',
    isLoading: false,
  });
  const [inputValue, setInputValue] = useState<IUserAddRecycleData>({
    type: '',
    weight: 0,
    selfDelivery: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const formAddRecycleHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setAlert({
      type: 'info',
      message: 'Adding new recycle request ...',
      isLoading: true,
    });
    try {
      const response = await userAddRecycle(
        session!.user.accessToken,
        inputValue,
      );
      if (response.success) {
        setAlert({
          type: 'success',
          message: response.success.data.message,
          isLoading: false,
        });
        router.push('/user/recycles');
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
            href="/user/recycles"
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
        <form className="grid grid-cols-none md:grid-cols-12 gap-5 m-3" onSubmit={formAddRecycleHandler}>
          <label className="block col-span-full md:col-span-6 lg:col-span-5 xl:col-span-4" htmlFor="type">
            <span className="text-slate-700 dark:text-slate-200">Trash Type</span>
            <input
              type="text"
              id="type"
              required
              disabled={isLoading}
              value={inputValue.type}
              onChange={(e) => setInputValue({ ...inputValue, type: e.target.value })}
              placeholder="Sampah Plastik / Kertas / Lainnya"
              className="w-full mt-1 rounded-md border dark:bg-zinc-600 dark:text-slate-100 border-slate-300 dark:border-zinc-600 px-3 py-1 placeholder-slate-600 dark:placeholder-zinc-200 placeholder-opacity-50 dark:placeholder-opacity-50 outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:ring-zinc-200 disabled:opacity-50"
            />
          </label>
          <label className="block md:col-start-1 lg:col-start-1 xl:col-start-1 col-span-full md:col-span-3 lg:col-span-2 xl:col-span-1" htmlFor="weight">
            <span className="text-slate-700 dark:text-slate-200">Weight (kg)</span>
            <input
              type="number"
              id="weight"
              required
              disabled={isLoading}
              value={inputValue.weight}
              onChange={(e) => setInputValue({ ...inputValue, weight: Number(e.target.value) })}
              className="w-full mt-1 rounded-md border dark:bg-zinc-600 dark:text-slate-100 border-slate-300 dark:border-zinc-600 px-3 py-1 placeholder-slate-600 dark:placeholder-zinc-200 placeholder-opacity-50 dark:placeholder-opacity-50 outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:ring-zinc-200 disabled:opacity-50"
            />
          </label>
          <label className="block md:col-start-1 lg:col-start-1 xl:col-start-1 col-span-full md:col-span-5 lg:col-span-4 xl:col-span-3" htmlFor="selfDelivery">
            <div className="flex relative items-center cursor-pointer">
              <input
                type="checkbox"
                id="selfDelivery"
                className="sr-only peer"
                onChange={(e) => setInputValue({
                  ...inputValue,
                  selfDelivery: e.target.checked ? 1 : 0,
                })}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Self Delivery</span>
            </div>
          </label>
          <div className="mt-2 md:col-start-1 lg:col-start-1 xl:col-start-1 col-span-full md:col-span-3 lg:col-span-2 xl:col-span-1">
            <Button
              type="submit"
              size="sm"
              disabled={isLoading}
              className="w-full rounded-md p-1"
            >
              Request
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
