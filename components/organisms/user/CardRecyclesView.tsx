import React, { useState, useEffect } from 'react';
import Alert, { IProps as IAlertProps } from '@/components/atoms/Alert';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from '@/components/atoms/Link';
import Button from '@/components/atoms/Button';
import {
  userGetRecycle,
  userDeleteRecycle,
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

  const getRecycleHandler = async () => {
    setIsLoading(true);
    setAlert({
      type: 'info',
      message: 'Getting data ...',
      isLoading: true,
    });
    try {
      const response = await userGetRecycle(
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

  const deleteRecycleHandler = async (id: number) => {
    setIsLoading(true);
    setAlert({
      message: 'Deleting recycle ...',
      isLoading: true,
    });
    try {
      const response = await userDeleteRecycle(session?.user.accessToken as string, id);
      if (response.success) {
        setAlert({
          message: response.success.data.message,
        });
        router.push('/user/recycles');
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
        const response = await userGetRecycle(
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
          <Link
            href="/user/recycles"
            variant="link"
            size="xs"
            className="px-2 py-1 rounded-full transition-none"
          >
            <i className="fa-solid fa-arrow-left mr-1" />
            Back
          </Link>
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
        {recycle?.recycleStatusId === 0 && (
          <div className="m-3">
            <Button
              size="sm"
              variant="danger"
              disabled={isLoading}
              className="rounded-md p-1"
              onClick={() => deleteRecycleHandler(recycle?.id)}
            >
              <i className="fa-solid fa-trash mr-1" />
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
