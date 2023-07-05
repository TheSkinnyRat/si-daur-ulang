import React, { useState } from 'react';
import Alert, { IProps as IAlertProps } from '@/components/atoms/Alert';
import { useSession } from 'next-auth/react';
import DataTable from '@/components/atoms/DataTable';
import Button from '@/components/atoms/Button';
import {
  staffGetBalanceHistories,
} from '@/lib/api';
import JsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function App(): JSX.Element {
  const { data: session } = useSession({
    required: true,
  });
  const [alert, setAlert] = useState<IAlertProps>({
    message: 'Balance report',
    isLoading: false,
  });
  const [balanceReport, setBalanceReport] = useState([]);
  const [inputValue, setInputValue] = useState<{
    dateMin: string;
    dateMax: string;
  }>({
    dateMin: '',
    dateMax: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const formGetBalanceReportHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setAlert({
      type: 'info',
      message: 'Getting balance report',
      isLoading: true,
    });
    try {
      const response = await staffGetBalanceHistories(session?.user.accessToken as string);
      if (response.success) {
        const turncatedResponseData = response.success.data.map((balance: any) => ({
          ...balance,
        }));
        const filteredTurncatedResponseData = turncatedResponseData.filter(
          (balance: any) => {
            const dateMin = new Date(inputValue.dateMin);
            const dateMax = new Date(inputValue.dateMax);
            const recycleDate = new Date(balance.createdAt);
            return recycleDate >= dateMin && recycleDate <= dateMax;
          },
        );
        const sortedFilteredTurncatedResponseData = filteredTurncatedResponseData.sort(
          (a: any, b: any) => {
            if (a.createdAt > b.createdAt) return 1;
            if (a.createdAt < b.createdAt) return -1;
            return 0;
          },
        );
        setBalanceReport(sortedFilteredTurncatedResponseData);
        setAlert({
          message: `Total balance: ${sortedFilteredTurncatedResponseData.length}`,
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

  const generatePDFHandler = async () => {
    const doc = new JsPDF({
      orientation: 'landscape',
    });
    doc.setFontSize(15);
    doc.text('SI Daur Ulang', 14, 10);
    doc.setFontSize(15);
    doc.text('Balance Report', 14, 17);
    doc.setFontSize(10);
    doc.text(`From ${inputValue.dateMin} to ${inputValue.dateMax}`, 14, 22);

    autoTable(doc, {
      startY: 30,
      head: [[
        'ID',
        'Date',
        'Type',
        'Amount',
        'Description',
        'Start Balance',
        'Current Balance',
      ]],
      body: balanceReport.map((balance: any) => [
        balance.id,
        new Date(balance?.date).toLocaleString(),
        balance?.type,
        balance?.amount ? `${balance?.type === 'credit' ? '+' : '-'}${Number(balance.amount.split('.')[0])?.toLocaleString('id-ID')}` : undefined,
        balance?.description ?? '-',
        balance?.startBalance ? Number(balance.startBalance.split('.')[0])?.toLocaleString('id-ID') : undefined,
        balance?.currentBalance ? Number(balance.currentBalance.split('.')[0])?.toLocaleString('id-ID') : undefined,
      ]),
    });

    doc.save(`balance-report-${inputValue.dateMin.split('-').join('')}-${inputValue.dateMax.split('-').join('')}.pdf`);
  };

  return (
    <div>
      <div className="bg-white dark:bg-zinc-800 border dark:border-zinc-700 relative shadow-md sm:rounded-lg overflow-hidden">
        <div className="px-4 py-3 text-xs text-slate-700 uppercase font-bold bg-slate-100 dark:bg-zinc-700 dark:text-zinc-300">
          <Alert type={alert.type} message={alert.message} isLoading={alert.isLoading} />
        </div>
        <form className="grid grid-cols-none md:grid-cols-12 gap-x-3 gap-y-1 m-3" onSubmit={formGetBalanceReportHandler}>
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
        {balanceReport.length > 0 && (
          <>
            <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
            <Button
              size="xs"
              disabled={isLoading}
              className="rounded-md p-1 ml-3 mb-3"
              onClick={generatePDFHandler}
            >
              <i className="fas fa-file-pdf mr-1" />
              Download PDF
            </Button>
            <DataTable
              itemsPerPage={20}
              alert={alert}
              headers={[
                'ID',
                'Date',
                'Type',
                'Amount',
                'Description',
                'Start Balance',
                'Current Balance',
              ]}
              datas={balanceReport}
              dataKey="id"
              dataMappings={{
                id: 'id',
                date: 'date',
                type: 'type',
                amount: 'amount',
                description: 'description',
                startBalance: 'startBalance',
                currentBalance: 'currentBalance',
              }}
              dataConditionalValue={{
                date: (data: any) => new Date(data).toLocaleString(),
                amount: (data: any) => Number(data.split('.')[0]).toLocaleString('id-ID'),
                startBalance: (data: any) => Number(data.split('.')[0]).toLocaleString('id-ID'),
                currentBalance: (data: any) => Number(data.split('.')[0]).toLocaleString('id-ID'),
              }}
              dataConditionalClassName={{
                type: (data: any) => {
                  if (data === 'debit') return 'text-red-500';
                  if (data === 'credit') return 'text-green-500';
                  return '';
                },
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
