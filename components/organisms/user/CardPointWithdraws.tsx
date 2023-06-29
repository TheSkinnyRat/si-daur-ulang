import React, { useEffect, useState } from 'react';
import { userGetPointWithdraw } from '@/lib/api';
import { IProps as IAlertProps } from '@/components/atoms/Alert';
import { useSession } from 'next-auth/react';
import DataTable from '@/components/atoms/DataTable';
import Button from '@/components/atoms/Button';

export default function App(): JSX.Element {
  const { data: session } = useSession({
    required: true,
  });
  const [pointWithdraws, setPointWithdraws] = useState([]);
  const [alert, setAlert] = useState<IAlertProps>({
    message: 'Getting withdraw history ...',
    isLoading: true,
  });
  const [isLoading, setIsLoading] = useState(false);

  const getRecyclesHandler = async () => {
    setIsLoading(true);
    setAlert({
      message: 'Getting withdraw history ...',
      isLoading: true,
    });
    try {
      const response = await userGetPointWithdraw(session?.user.accessToken as string);
      if (response.success) {
        const turncatedResponseData = response.success.data.map((pointWithdraw: any) => ({
          ...pointWithdraw,
        }));
        const sortedTurncatedResponseData = turncatedResponseData.sort((a: any, b: any) => {
          if (a.date > b.date) return -1;
          if (a.date < b.date) return 1;
          return 0;
        });
        setPointWithdraws(sortedTurncatedResponseData);
        setAlert({
          message: `Total withdraw history: ${response.success.data.length}`,
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
        const response = await userGetPointWithdraw(session?.user.accessToken as string);
        if (response.success) {
          const turncatedResponseData = response.success.data.map((pointWithdraw: any) => ({
            ...pointWithdraw,
          }));
          const sortedTurncatedResponseData = turncatedResponseData.sort((a: any, b: any) => {
            if (a.createdAt > b.createdAt) return -1;
            if (a.createdAt < b.createdAt) return 1;
            return 0;
          });
          setPointWithdraws(sortedTurncatedResponseData);
          setAlert({
            message: `Total withdraw history: ${response.success.data.length}`,
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
  }, [session?.user.accessToken, setPointWithdraws]);

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
          Withdraw History
        </div>
        <DataTable
          itemsPerPage={10}
          alert={alert}
          headers={[
            'ID',
            'Amount',
            'Withdraw To',
            'No. Telp / VA / Rek',
            'Description',
            'Withdrawal Status',
          ]}
          datas={pointWithdraws}
          dataKey="id"
          dataMappings={{
            id: 'id',
            amount: 'amount',
            type: 'type',
            typeValue: 'typeValue',
            description: 'description',
            pointWithdrawalStatusId: 'pointWithdrawalStatusId',
          }}
          dataConditionalValue={{
            amount: (data: any) => Number(data.split('.')[0]).toLocaleString('id-ID'),
            pointWithdrawalStatusId: (data: any) => {
              if (data === -1) return 'Rejected';
              if (data === 0) return 'Requested';
              if (data === 1) return 'Completed';
              return data;
            },
          }}
          dataConditionalClassName={{
            pointWithdrawalStatusId: (data: any) => {
              if (data === -1) return 'text-red-500';
              if (data === 1) return 'text-green-500';
              return '';
            },
          }}
        />
      </div>
    </div>
  );
}
