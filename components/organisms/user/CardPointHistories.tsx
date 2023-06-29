import React, { useEffect, useState } from 'react';
import { userGetPointHistories } from '@/lib/api';
import { IProps as IAlertProps } from '@/components/atoms/Alert';
import { useSession } from 'next-auth/react';
import DataTable from '@/components/atoms/DataTable';
import Button from '@/components/atoms/Button';

export default function App(): JSX.Element {
  const { data: session } = useSession({
    required: true,
  });
  const [pointHistories, setPointHistories] = useState([]);
  const [alert, setAlert] = useState<IAlertProps>({
    message: 'Getting point history ...',
    isLoading: true,
  });
  const [isLoading, setIsLoading] = useState(false);

  const getRecyclesHandler = async () => {
    setIsLoading(true);
    setAlert({
      message: 'Getting point history ...',
      isLoading: true,
    });
    try {
      const response = await userGetPointHistories(session?.user.accessToken as string);
      if (response.success) {
        const turncatedResponseData = response.success.data.map((pointWithdraw: any) => ({
          ...pointWithdraw,
        }));
        const sortedTurncatedResponseData = turncatedResponseData.sort((a: any, b: any) => {
          if (a.date > b.date) return -1;
          if (a.date < b.date) return 1;
          return 0;
        });
        setPointHistories(sortedTurncatedResponseData);
        setAlert({
          message: `Total point history: ${response.success.data.length}`,
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

  useEffect(() => {
    const initialGetRecycles = async () => {
      setIsLoading(true);
      try {
        const response = await userGetPointHistories(session?.user.accessToken as string);
        if (response.success) {
          const turncatedResponseData = response.success.data.map((pointWithdraw: any) => ({
            ...pointWithdraw,
          }));
          const sortedTurncatedResponseData = turncatedResponseData.sort((a: any, b: any) => {
            if (a.createdAt > b.createdAt) return -1;
            if (a.createdAt < b.createdAt) return 1;
            return 0;
          });
          setPointHistories(sortedTurncatedResponseData);
          setAlert({
            message: `Total point history: ${response.success.data.length}`,
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
    if (session?.user.accessToken) initialGetRecycles();
  }, [session?.user.accessToken, setPointHistories]);

  return (
    <div>
      <div className="bg-white dark:bg-zinc-800 border dark:border-zinc-700 relative shadow-md sm:rounded-lg overflow-hidden">
        <div className="m-2 mb-3">
          <Button
            variant="primary"
            size="xs"
            disabled={isLoading}
            onClick={getRecyclesHandler}
            className="px-2 py-1 rounded-full ml-1"
          >
            <i className="fa-solid fa-rotate mr-1" />
            Refresh
          </Button>
        </div>
        <div className="px-4 py-3 text-xs text-slate-700 dark:text-zinc-300 uppercase font-bold text-center bg-slate-200 dark:bg-zinc-600">
          Point History
        </div>
        <DataTable
          itemsPerPage={10}
          alert={alert}
          headers={[
            'ID',
            'Type',
            'Amount',
            'Description',
            'Start Point',
            'Current Point',
          ]}
          datas={pointHistories}
          dataKey="id"
          dataMappings={{
            id: 'id',
            type: 'type',
            amount: 'amount',
            description: 'description',
            startPoint: 'startPoint',
            currentPoint: 'currentPoint',
          }}
          dataConditionalValue={{
            amount: (data: any) => Number(data.split('.')[0]).toLocaleString('id-ID'),
            startPoint: (data: any) => Number(data.split('.')[0]).toLocaleString('id-ID'),
            currentPoint: (data: any) => Number(data.split('.')[0]).toLocaleString('id-ID'),
          }}
          dataConditionalClassName={{
            type: (data: any) => {
              if (data === 'debit') return 'text-red-500';
              if (data === 'credit') return 'text-green-500';
              return '';
            },
          }}
        />
      </div>
    </div>
  );
}
