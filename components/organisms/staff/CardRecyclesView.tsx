import React, { useState, useEffect } from 'react';
import Alert, { IProps as IAlertProps } from '@/components/atoms/Alert';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Button from '@/components/atoms/Button';
import {
  staffGetRecycle,
  staffUpdateRecycle,
  IStaffUpdateRecycleData,
} from '@/lib/api';
import { ParsedUrlQuery } from 'querystring';

export interface IProps {
  query?: ParsedUrlQuery;
}

export default function App({ query }: IProps): JSX.Element {
  const queryId = parseInt(query?.id as string, 10);
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
  });
  const [alert, setAlert] = useState<IAlertProps>({
    message: `Viewing recycle with id: ${queryId}`,
    isLoading: false,
  });
  const [recycle, setRecycle] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState<IStaffUpdateRecycleData>({
    recycleStatusId: 4,
    actualType: '',
    actualWeight: undefined,
    actualPoint: undefined,
  });

  const getRecycleHandler = async () => {
    setIsLoading(true);
    setAlert({
      type: 'info',
      message: 'Getting data ...',
      isLoading: true,
    });
    try {
      const response = await staffGetRecycle(
        session?.user.accessToken as string,
        queryId,
      );
      if (response.success) {
        setRecycle(response.success.data[0]);
        setAlert({
          message: `Viewing recycle with id: ${queryId}`,
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

  const verifyRecycleHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setAlert({
      message: 'Verifying recycle ...',
      isLoading: true,
    });
    try {
      const response = await staffUpdateRecycle(
        session?.user.accessToken as string,
        recycle?.id,
        inputValue,
      );
      if (response.success) {
        setAlert({
          type: 'success',
          message: response.success.data.message,
        });
        getRecycleHandler();
      }
    } catch (error: any) {
      setAlert({
        type: 'danger',
        message: `Error: ${error?.response?.data?.error?.message || error?.message || 'Unknown error'}`,
      });
    } finally {
      setIsLoading(false);
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
        const response = await staffGetRecycle(
          session?.user.accessToken as string,
          queryId,
        );
        if (response.success) {
          setRecycle(response.success.data[0]);
          setAlert({
            message: `Viewing recycle with id: ${queryId}`,
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
    if (session?.user.accessToken && queryId) initialGetRecycle();
  }, [queryId, session?.user.accessToken]);

  return (
    <div>
      <div className="bg-white dark:bg-zinc-800 border dark:border-zinc-700 relative shadow-md sm:rounded-lg overflow-hidden">
        <div className="m-2 mb-3">
          <Button
            variant="link"
            size="xs"
            className="px-2 py-1 rounded-full transition-none"
            onClick={() => router.back()}
          >
            <i className="fa-solid fa-arrow-left mr-1" />
            Back
          </Button>
          <Button
            variant="primary"
            size="xs"
            disabled={isLoading}
            onClick={getRecycleHandler}
            className="px-2 py-1 rounded-full ml-1"
          >
            <i className="fa-solid fa-rotate mr-1" />
            Refresh
          </Button>
        </div>
        <div className="px-4 py-3 text-xs text-slate-700 uppercase font-bold bg-slate-100 dark:bg-zinc-700 dark:text-zinc-300">
          <Alert type={alert.type} message={alert.message} isLoading={alert.isLoading} />
        </div>
        <div className="grid grid-cols-12 gap-0.5 m-3">
          <div className="flex col-span-12 lg:col-span-10 xl:col-span-8">
            <div className="flex-1 py-1 px-2 rounded-md rounded-r-none bg-slate-300 dark:bg-zinc-600 bg-opacity-75 dark:bg-opacity-40 text-slate-700 dark:text-slate-200">
              Trash Type
            </div>
            <div className="flex-1 py-1 px-2 rounded-md rounded-l-none bg-slate-300 dark:bg-zinc-700 bg-opacity-50 dark:bg-opacity-40 text-slate-700 dark:text-slate-200">
              {recycle?.type ?? '-'}
            </div>
          </div>
          <div className="flex col-span-12 lg:col-span-10 xl:col-span-8">
            <div className="flex-1 py-1 px-2 rounded-md rounded-r-none bg-slate-300 dark:bg-zinc-600 bg-opacity-75 dark:bg-opacity-40 text-slate-700 dark:text-slate-200">
              Weight
            </div>
            <div className="flex-1 py-1 px-2 rounded-md rounded-l-none bg-slate-300 dark:bg-zinc-700 bg-opacity-50 dark:bg-opacity-40 text-slate-700 dark:text-slate-200">
              {recycle?.weight ?? '-'}
              {' '}
              kg
            </div>
          </div>
          <div className="flex col-span-12 lg:col-span-10 xl:col-span-8">
            <div className="flex-1 py-1 px-2 rounded-md rounded-r-none bg-slate-300 dark:bg-zinc-600 bg-opacity-75 dark:bg-opacity-40 text-slate-700 dark:text-slate-200">
              Delivery
            </div>
            <div className="flex-1 py-1 px-2 rounded-md rounded-l-none bg-slate-300 dark:bg-zinc-700 bg-opacity-50 dark:bg-opacity-40 text-slate-700 dark:text-slate-200">
              {recycle?.selfDelivery ? 'Self Delivery' : 'Driver Pickup'}
            </div>
          </div>
          <div className="flex col-span-12 lg:col-span-10 xl:col-span-8">
            <div className="flex-1 py-1 px-2 rounded-md rounded-r-none bg-slate-300 dark:bg-zinc-600 bg-opacity-75 dark:bg-opacity-40 text-slate-700 dark:text-slate-200">
              Actual Type
            </div>
            <div className="flex-1 py-1 px-2 rounded-md rounded-l-none bg-slate-300 dark:bg-zinc-700 bg-opacity-50 dark:bg-opacity-40 text-slate-700 dark:text-slate-200">
              {recycle?.actualType ?? '-'}
            </div>
          </div>
          <div className="flex col-span-12 lg:col-span-10 xl:col-span-8">
            <div className="flex-1 py-1 px-2 rounded-md rounded-r-none bg-slate-300 dark:bg-zinc-600 bg-opacity-75 dark:bg-opacity-40 text-slate-700 dark:text-slate-200">
              Actual Weight
            </div>
            <div className="flex-1 py-1 px-2 rounded-md rounded-l-none bg-slate-300 dark:bg-zinc-700 bg-opacity-50 dark:bg-opacity-40 text-slate-700 dark:text-slate-200">
              {recycle?.actualWeight ?? '-'}
              {' '}
              kg
            </div>
          </div>
          <div className="flex col-span-12 lg:col-span-10 xl:col-span-8">
            <div className="flex-1 py-1 px-2 rounded-md rounded-r-none bg-slate-300 dark:bg-zinc-600 bg-opacity-75 dark:bg-opacity-40 text-slate-700 dark:text-slate-200">
              Actual Point
            </div>
            <div className="flex-1 py-1 px-2 rounded-md rounded-l-none bg-slate-300 dark:bg-zinc-700 bg-opacity-50 dark:bg-opacity-40 text-slate-700 dark:text-slate-200">
              {recycle?.actualPoint ? Number(recycle.actualPoint.split('.')[0])?.toLocaleString('id-ID') : '-'}
            </div>
          </div>
          <div className="flex col-span-12 lg:col-span-10 xl:col-span-8">
            <div className="flex-1 py-1 px-2 rounded-md rounded-r-none bg-slate-300 dark:bg-zinc-600 bg-opacity-75 dark:bg-opacity-40 text-slate-700 dark:text-slate-200">
              Recycle Status
            </div>
            <div className="flex-1 py-1 px-2 font-semibold rounded-md rounded-l-none bg-slate-300 dark:bg-zinc-700 bg-opacity-50 dark:bg-opacity-40 text-slate-700 dark:text-slate-200">
              {recycle?.recycleStatusId === 0 && (
              <span className="">Requested</span>
              )}
              {recycle?.recycleStatusId === 1 && (
              <span className="text-yellow-500">Driver Pickup</span>
              )}
              {recycle?.recycleStatusId === 2 && (
              <span className="text-cyan-500">Driver Delivery</span>
              )}
              {recycle?.recycleStatusId === 3 && (
              <span className="text-blue-500">Accepted</span>
              )}
              {recycle?.recycleStatusId === 4 && (
              <span className="text-green-500">Completed</span>
              )}
            </div>
          </div>
        </div>
        {recycle?.driver && (
          <div className="grid grid-cols-12 gap-0.5 m-3">
            <div className="flex col-span-12 lg:col-span-10 xl:col-span-8">
              <div className="flex-1 py-1 px-2 rounded-md rounded-r-none bg-slate-300 dark:bg-zinc-600 bg-opacity-75 dark:bg-opacity-40 text-slate-700 dark:text-slate-200">
                Driver Name
              </div>
              <div className="flex-1 py-1 px-2 rounded-md rounded-l-none bg-slate-300 dark:bg-zinc-700 bg-opacity-50 dark:bg-opacity-40 text-slate-700 dark:text-slate-200">
                {recycle?.driver?.name ?? '-'}
              </div>
            </div>
            <div className="flex col-span-12 lg:col-span-10 xl:col-span-8">
              <div className="flex-1 py-1 px-2 rounded-md rounded-r-none bg-slate-300 dark:bg-zinc-600 bg-opacity-75 dark:bg-opacity-40 text-slate-700 dark:text-slate-200">
                Driver Telp
              </div>
              <div className="flex-1 py-1 px-2 rounded-md rounded-l-none bg-slate-300 dark:bg-zinc-700 bg-opacity-50 dark:bg-opacity-40 text-slate-700 dark:text-slate-200">
                {recycle?.driver?.phone ?? '-'}
              </div>
            </div>
          </div>
        )}
        {recycle?.recycleStatusId === 3 && (
          <>
            <div className="px-4 py-3 text-xs text-slate-700 dark:text-zinc-300 uppercase font-bold bg-slate-100 dark:bg-zinc-700 border-y border-slate-300 dark:border-zinc-500">
              <Alert type="success" message="Verify Recycle" />
            </div>
            <form className="grid grid-cols-none md:grid-cols-12 gap-5 m-3" onSubmit={verifyRecycleHandler}>
              <label className="block col-span-full md:col-span-6 lg:col-span-5 xl:col-span-4" htmlFor="actualType">
                <span className="text-slate-700 dark:text-slate-200">Actual Trash Type</span>
                <input
                  type="text"
                  id="actualType"
                  required
                  disabled={isLoading}
                  value={inputValue.actualType}
                  onChange={(e) => setInputValue({ ...inputValue, actualType: e.target.value })}
                  placeholder="Sampah Plastik / Kertas / Lainnya"
                  className="w-full mt-1 rounded-md border dark:bg-zinc-600 dark:text-slate-100 border-slate-300 dark:border-zinc-600 px-3 py-1 placeholder-slate-600 dark:placeholder-zinc-200 placeholder-opacity-50 dark:placeholder-opacity-50 outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:ring-zinc-200 disabled:opacity-50"
                />
              </label>
              <label className="block md:col-start-1 lg:col-start-1 xl:col-start-1 col-span-full md:col-span-6 lg:col-span-5 xl:col-span-4" htmlFor="actualWeight">
                <span className="text-slate-700 dark:text-slate-200">Actual Weight (kg)</span>
                <input
                  type="number"
                  id="actualWeight"
                  required
                  disabled={isLoading}
                  value={inputValue.actualWeight}
                  onChange={(e) => setInputValue({
                    ...inputValue,
                    actualWeight: Number(e.target.value),
                  })}
                  className="w-full mt-1 rounded-md border dark:bg-zinc-600 dark:text-slate-100 border-slate-300 dark:border-zinc-600 px-3 py-1 placeholder-slate-600 dark:placeholder-zinc-200 placeholder-opacity-50 dark:placeholder-opacity-50 outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:ring-zinc-200 disabled:opacity-50"
                />
              </label>
              <label className="block md:col-start-1 lg:col-start-1 xl:col-start-1 col-span-full md:col-span-6 lg:col-span-5 xl:col-span-4" htmlFor="actualPoint">
                <span className="text-slate-700 dark:text-slate-200">Actual Point</span>
                <input
                  type="number"
                  id="actualPoint"
                  required
                  disabled={isLoading}
                  value={inputValue.actualPoint}
                  onChange={(e) => setInputValue({
                    ...inputValue,
                    actualPoint: Number(e.target.value),
                  })}
                  className="w-full mt-1 rounded-md border dark:bg-zinc-600 dark:text-slate-100 border-slate-300 dark:border-zinc-600 px-3 py-1 placeholder-slate-600 dark:placeholder-zinc-200 placeholder-opacity-50 dark:placeholder-opacity-50 outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:ring-zinc-200 disabled:opacity-50"
                />
              </label>
              <div className="mt-2 md:col-start-1 lg:col-start-1 xl:col-start-1 col-span-full md:col-span-4 lg:col-span-3 xl:col-span-2">
                <Button
                  type="submit"
                  size="sm"
                  variant="success"
                  disabled={isLoading}
                  className="w-full rounded-md p-1"
                >
                  Verify Recycle
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
