import React, { useState, useEffect } from 'react';
import Alert, { IProps as IAlertProps } from '@/components/atoms/Alert';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Button from '@/components/atoms/Button';
import {
  staffGetPointWithdrawal,
  staffUpdatePointWithdrawal,
  IStaffUpdatePointWithdrawalData,
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
    message: `Viewing point withdrawal with id: ${queryId}`,
    isLoading: false,
  });
  const [pointWithdrawal, setPointWithdrawal] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState<IStaffUpdatePointWithdrawalData>({
    pointWithdrawalStatusId: 0,
    description: undefined,
  });

  const getPointWithdrawalHandler = async () => {
    setIsLoading(true);
    setAlert({
      type: 'info',
      message: 'Getting data ...',
      isLoading: true,
    });
    try {
      const response = await staffGetPointWithdrawal(
        session?.user.accessToken as string,
        queryId,
      );
      if (response.success) {
        setPointWithdrawal(response.success.data[0]);
        setAlert({
          message: `Viewing point withdrawal with id: ${queryId}`,
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

  const verifyPointWithdrawalHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setAlert({
      message: 'Updating point withdrawal ...',
      isLoading: true,
    });
    try {
      const response = await staffUpdatePointWithdrawal(
        session?.user.accessToken as string,
        pointWithdrawal?.id,
        inputValue,
      );
      if (response.success) {
        setAlert({
          type: 'success',
          message: response.success.data.message,
        });
        getPointWithdrawalHandler();
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
        const response = await staffGetPointWithdrawal(
          session?.user.accessToken as string,
          queryId,
        );
        if (response.success) {
          setPointWithdrawal(response.success.data[0]);
          setAlert({
            message: `Viewing point withdrawal with id: ${queryId}`,
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
            onClick={getPointWithdrawalHandler}
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
              Requested by
            </div>
            <div className="flex-1 py-1 px-2 rounded-md rounded-l-none bg-slate-300 dark:bg-zinc-700 bg-opacity-50 dark:bg-opacity-40 text-slate-700 dark:text-slate-200">
              {pointWithdrawal?.point?.user?.name ?? '-'}
            </div>
          </div>
          <div className="flex col-span-12 lg:col-span-10 xl:col-span-8">
            <div className="flex-1 py-1 px-2 rounded-md rounded-r-none bg-slate-300 dark:bg-zinc-600 bg-opacity-75 dark:bg-opacity-40 text-slate-700 dark:text-slate-200">
              Date
            </div>
            <div className="flex-1 py-1 px-2 rounded-md rounded-l-none bg-slate-300 dark:bg-zinc-700 bg-opacity-50 dark:bg-opacity-40 text-slate-700 dark:text-slate-200">
              {pointWithdrawal?.date ? new Date(pointWithdrawal.date).toLocaleString('id-ID') : '-'}
            </div>
          </div>
          <div className="flex col-span-12 lg:col-span-10 xl:col-span-8">
            <div className="flex-1 py-1 px-2 rounded-md rounded-r-none bg-slate-300 dark:bg-zinc-600 bg-opacity-75 dark:bg-opacity-40 text-slate-700 dark:text-slate-200">
              Amount
            </div>
            <div className="font-semibold flex-1 py-1 px-2 rounded-md rounded-l-none bg-slate-300 dark:bg-zinc-700 bg-opacity-50 dark:bg-opacity-40 text-slate-700 dark:text-slate-200">
              {pointWithdrawal?.amount ? Number(pointWithdrawal.amount.split('.')[0]).toLocaleString('id-ID') : '-'}
            </div>
          </div>
          <div className="flex col-span-12 lg:col-span-10 xl:col-span-8">
            <div className="flex-1 py-1 px-2 rounded-md rounded-r-none bg-slate-300 dark:bg-zinc-600 bg-opacity-75 dark:bg-opacity-40 text-slate-700 dark:text-slate-200">
              Withdraw To
            </div>
            <div className="flex-1 py-1 px-2 rounded-md rounded-l-none bg-slate-300 dark:bg-zinc-700 bg-opacity-50 dark:bg-opacity-40 text-slate-700 dark:text-slate-200">
              {pointWithdrawal?.type ?? '-'}
            </div>
          </div>
          <div className="flex col-span-12 lg:col-span-10 xl:col-span-8">
            <div className="flex-1 py-1 px-2 rounded-md rounded-r-none bg-slate-300 dark:bg-zinc-600 bg-opacity-75 dark:bg-opacity-40 text-slate-700 dark:text-slate-200">
              No. Telp / VA / REK
            </div>
            <div className="flex-1 py-1 px-2 rounded-md rounded-l-none bg-slate-300 dark:bg-zinc-700 bg-opacity-50 dark:bg-opacity-40 text-slate-700 dark:text-slate-200">
              {pointWithdrawal?.typeValue ?? '-'}
            </div>
          </div>
          <div className="flex col-span-12 lg:col-span-10 xl:col-span-8">
            <div className="flex-1 py-1 px-2 rounded-md rounded-r-none bg-slate-300 dark:bg-zinc-600 bg-opacity-75 dark:bg-opacity-40 text-slate-700 dark:text-slate-200">
              Description
            </div>
            <div className="flex-1 py-1 px-2 rounded-md rounded-l-none bg-slate-300 dark:bg-zinc-700 bg-opacity-50 dark:bg-opacity-40 text-slate-700 dark:text-slate-200">
              {pointWithdrawal?.description ?? '-'}
            </div>
          </div>
          <div className="flex col-span-12 lg:col-span-10 xl:col-span-8">
            <div className="flex-1 py-1 px-2 rounded-md rounded-r-none bg-slate-300 dark:bg-zinc-600 bg-opacity-75 dark:bg-opacity-40 text-slate-700 dark:text-slate-200">
              Withdrawal Status
            </div>
            <div className="flex-1 py-1 px-2 font-semibold rounded-md rounded-l-none bg-slate-300 dark:bg-zinc-700 bg-opacity-50 dark:bg-opacity-40 text-slate-700 dark:text-slate-200">
              {pointWithdrawal?.pointWithdrawalStatusId === -1 && (
              <span className="text-red-500">Rejected</span>
              )}
              {pointWithdrawal?.pointWithdrawalStatusId === 0 && (
              <span className="">Requested</span>
              )}
              {pointWithdrawal?.pointWithdrawalStatusId === 1 && (
              <span className="text-green-500">Completed</span>
              )}
            </div>
          </div>
        </div>
        {pointWithdrawal?.pointWithdrawalStatusId === 0 && (
          <>
            <div className="px-4 py-3 text-xs text-slate-700 dark:text-zinc-300 uppercase font-bold bg-slate-100 dark:bg-zinc-700 border-y border-slate-300 dark:border-zinc-500">
              <Alert type="success" message="Verify Point Withdrawal" />
            </div>
            <form className="grid grid-cols-none md:grid-cols-12 gap-5 m-3" onSubmit={verifyPointWithdrawalHandler}>
              <label className="block col-span-full md:col-span-6 lg:col-span-5 xl:col-span-4" htmlFor="description">
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
              <div className="block md:col-start-1 lg:col-start-1 xl:col-start-1 col-span-full md:col-span-6 lg:col-span-5 xl:col-span-4">
                <div className="mb-1 text-slate-700 dark:text-slate-200">Status</div>
                <div className="flex">
                  <label htmlFor="pointWithdrawalStatusId-reject" className="flex items-center mr-4">
                    <input
                      id="pointWithdrawalStatusId-reject"
                      type="radio"
                      value="1"
                      name="pointWithdrawalStatusId"
                      onChange={(e) => setInputValue({
                        ...inputValue,
                        pointWithdrawalStatusId: Number(e.target.value),
                      })}
                      className="w-4 h-4 text-blue-600 bg-gray-100 dark:bg-gray-700 dark:checked:bg-current border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:border-gray-600"
                      required
                    />
                    <span className="ml-2 text-sm font-bold text-emerald-500">ACCEPT</span>
                  </label>
                  <label htmlFor="pointWithdrawalStatusId-accept" className="flex items-center mr-4">
                    <input
                      id="pointWithdrawalStatusId-accept"
                      type="radio"
                      value="-1"
                      name="pointWithdrawalStatusId"
                      onChange={(e) => setInputValue({
                        ...inputValue,
                        pointWithdrawalStatusId: Number(e.target.value),
                      })}
                      className="w-4 h-4 text-blue-600 bg-gray-100 dark:bg-gray-700 dark:checked:bg-current border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:border-gray-600"
                      required
                    />
                    <span className="ml-2 text-sm font-bold text-red-500">REJECT</span>
                  </label>
                </div>
              </div>
              <div className="mt-2 md:col-start-1 lg:col-start-1 xl:col-start-1 col-span-full md:col-span-3 lg:col-span-2 xl:col-span-1">
                <Button
                  type="submit"
                  size="sm"
                  variant="success"
                  disabled={isLoading}
                  className="w-full rounded-md p-1"
                >
                  Verify
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
