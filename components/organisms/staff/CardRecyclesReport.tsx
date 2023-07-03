import React, { useState } from 'react';
import Alert, { IProps as IAlertProps } from '@/components/atoms/Alert';
import { useSession } from 'next-auth/react';
import DataTable from '@/components/atoms/DataTable';
import Button from '@/components/atoms/Button';
import {
  staffGetRecyclesVerified,
} from '@/lib/api';

export default function App(): JSX.Element {
  const { data: session } = useSession({
    required: true,
  });
  const [alert, setAlert] = useState<IAlertProps>({
    message: 'Recycles report',
    isLoading: false,
  });
  const [recyclesReport, setRecyclesReport] = useState([]);
  const [inputValue, setInputValue] = useState<{
    dateMin: string;
    dateMax: string;
  }>({
    dateMin: '',
    dateMax: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const formGetRecyclesReportHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setAlert({
      type: 'info',
      message: 'Getting verified recycles report ...',
      isLoading: true,
    });
    try {
      const response = await staffGetRecyclesVerified(session?.user.accessToken as string);
      if (response.success) {
        const turncatedResponseData = response.success.data.map((recycle: any) => ({
          ...recycle,
        }));
        const filteredTurncatedResponseData = turncatedResponseData.filter((recycle: any) => {
          const dateMin = new Date(inputValue.dateMin);
          const dateMax = new Date(inputValue.dateMax);
          const recycleDate = new Date(recycle.createdAt);
          return recycleDate >= dateMin && recycleDate <= dateMax;
        });
        const sortedFilteredTurncatedResponseData = filteredTurncatedResponseData.sort(
          (a: any, b: any) => {
            if (a.createdAt > b.createdAt) return 1;
            if (a.createdAt < b.createdAt) return -1;
            return 0;
          },
        );
        setRecyclesReport(sortedFilteredTurncatedResponseData);
        setAlert({
          message: `Total verified recycles: ${sortedFilteredTurncatedResponseData.length}`,
        });
      }
    } catch (error: any) {
      setAlert({
        message: `Error: ${error?.response?.data?.error?.message || error?.message || 'Unknown error'}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-white dark:bg-zinc-800 border dark:border-zinc-700 relative shadow-md sm:rounded-lg overflow-hidden">
        <div className="px-4 py-3 text-xs text-slate-700 uppercase font-bold bg-slate-100 dark:bg-zinc-700 dark:text-zinc-300">
          <Alert type={alert.type} message={alert.message} isLoading={alert.isLoading} />
        </div>
        <form className="grid grid-cols-none md:grid-cols-12 gap-x-3 gap-y-1 m-3" onSubmit={formGetRecyclesReportHandler}>
          <label className="block col-span-full md:col-span-6 lg:col-span-5 xl:col-span-4" htmlFor="dateMin">
            <span className="text-slate-700 dark:text-slate-200">Date After</span>
            <input
              type="date"
              id="dateMin"
              required
              disabled={isLoading}
              value={inputValue.dateMin}
              onChange={(e) => setInputValue({ ...inputValue, dateMin: e.target.value })}
              className="w-full mt-1 rounded-md border dark:bg-zinc-600 dark:text-slate-100 border-slate-300 dark:border-zinc-600 px-3 py-1 placeholder-slate-600 dark:placeholder-zinc-200 placeholder-opacity-50 dark:placeholder-opacity-50 outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:ring-zinc-200 disabled:opacity-50"
            />
          </label>
          <label className="block col-span-full md:col-span-6 lg:col-span-5 xl:col-span-4" htmlFor="dateMax">
            <span className="text-slate-700 dark:text-slate-200">Date Before</span>
            <input
              type="date"
              id="dateMax"
              required
              disabled={isLoading}
              value={inputValue.dateMax}
              onChange={(e) => setInputValue({ ...inputValue, dateMax: e.target.value })}
              className="w-full mt-1 rounded-md border dark:bg-zinc-600 dark:text-slate-100 border-slate-300 dark:border-zinc-600 px-3 py-1 placeholder-slate-600 dark:placeholder-zinc-200 placeholder-opacity-50 dark:placeholder-opacity-50 outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:ring-zinc-200 disabled:opacity-50"
            />
          </label>
          <div className="mt-2 md:col-start-1 lg:col-start-1 xl:col-start-1 col-span-full md:col-span-3 lg:col-span-2 xl:col-span-1">
            <Button
              type="submit"
              size="sm"
              disabled={isLoading}
              className="w-full rounded-md p-1"
            >
              Generate
            </Button>
          </div>
        </form>
        {recyclesReport.length > 0 && (
          <DataTable
            itemsPerPage={20}
            alert={alert}
            headers={[
              'ID',
              'Date',
              'Type',
              'Weight (kg)',
              'Requester',
              'Address',
              'Recycle Status',
            ]}
            datas={recyclesReport}
            dataKey="id"
            dataMappings={{
              id: 'id',
              date: 'createdAt',
              type: 'type',
              weight: 'weight',
              requester: 'user.name',
              address: 'user.address',
              recycleStatusId: 'recycleStatusId',
            }}
            dataConditionalValue={{
              date: (data: any) => new Date(data).toLocaleString(),
              recycleStatusId: (data: any) => {
                if (data === 0) return 'Requested';
                if (data === 1) return 'Driver Pickup';
                if (data === 2) return 'Driver Delivery';
                if (data === 3) return 'Accepted';
                if (data === 4) return 'Completed';
                return data;
              },
            }}
            dataConditionalClassName={{
              recycleStatusId: (data: any) => {
                if (data === 1) return 'text-yellow-500';
                if (data === 2) return 'text-cyan-500';
                if (data === 3) return 'text-blue-500';
                if (data === 4) return 'text-green-500';
                return '';
              },
            }}
          />
        )}
      </div>
    </div>
  );
}
