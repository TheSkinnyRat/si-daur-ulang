import React, { useEffect, useState } from 'react';
import { staffGetBalanceHistories } from '@/lib/api';
import { IProps as IAlertProps } from '@/components/atoms/Alert';
import { useSession } from 'next-auth/react';
import DataTable from '@/components/atoms/DataTable';
import Button from '@/components/atoms/Button';

export default function App(): JSX.Element {
  const { data: session } = useSession({
    required: true,
  });
  const [balanceHistories, setBalanceHistories] = useState([]);
  const [alert, setAlert] = useState<IAlertProps>({
    message: 'Getting history of balance ...',
    isLoading: true,
  });
  const [isLoading, setIsLoading] = useState(false);

  const getBalanceHistoriesHandler = async () => {
    setIsLoading(true);
    setAlert({
      message: 'Getting history of balance ...',
      isLoading: true,
    });
    try {
      const response = await staffGetBalanceHistories(session?.user.accessToken as string);
      if (response.success) {
        const turncatedResponseData = response.success.data.map((balanceHistory: any) => ({
          ...balanceHistory,
        }));
        const sortedTurncatedResponseData = turncatedResponseData.sort((a: any, b: any) => {
          if (a.createdAt > b.createdAt) return -1;
          if (a.createdAt < b.createdAt) return 1;
          return 0;
        });
        setBalanceHistories(sortedTurncatedResponseData);
        setAlert({
          message: `Total history of balance: ${response.success.data.length}`,
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
    const initialGetBalanceHistories = async () => {
      setIsLoading(true);
      try {
        const response = await staffGetBalanceHistories(session?.user.accessToken as string);
        if (response.success) {
          const turncatedResponseData = response.success.data.map((balanceHistory: any) => ({
            ...balanceHistory,
          }));
          const sortedTurncatedResponseData = turncatedResponseData.sort((a: any, b: any) => {
            if (a.date > b.date) return -1;
            if (a.date < b.date) return 1;
            return 0;
          });
          setBalanceHistories(sortedTurncatedResponseData);
          setAlert({
            message: `Total history of balance: ${response.success.data.length}`,
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
    if (session?.user.accessToken) initialGetBalanceHistories();
  }, [session?.user.accessToken, setBalanceHistories]);

  return (
    <div>
      <div className="bg-white dark:bg-zinc-800 border dark:border-zinc-700 relative shadow-md sm:rounded-lg overflow-hidden">
        <div className="m-2 mb-3">
          <Button
            variant="primary"
            size="xs"
            disabled={isLoading}
            onClick={getBalanceHistoriesHandler}
            className="px-2 py-1 rounded-full ml-1"
          >
            <i className="fa-solid fa-rotate mr-1" />
            Refresh
          </Button>
        </div>
        <DataTable
          itemsPerPage={10}
          alert={alert}
          headers={[
            'ID',
            'Type',
            'Amount',
            'Description',
            'Start Balance',
            'Current Balance',
          ]}
          datas={balanceHistories}
          dataKey="id"
          dataMappings={{
            id: 'id',
            type: 'type',
            amount: 'amount',
            description: 'description',
            startBalance: 'startBalance',
            currentBalance: 'currentBalance',
          }}
          dataConditionalValue={{
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
      </div>
    </div>
  );
}
