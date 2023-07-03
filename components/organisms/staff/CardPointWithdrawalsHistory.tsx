import React, { useEffect, useState } from 'react';
import { staffGetPointWithdrawalsHistory } from '@/lib/api';
import { IProps as IAlertProps } from '@/components/atoms/Alert';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import DataTable from '@/components/atoms/DataTable';
import Button from '@/components/atoms/Button';

export default function App(): JSX.Element {
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
  });
  const [pointWithdrawals, setPointWithdrawals] = useState([]);
  const [alert, setAlert] = useState<IAlertProps>({
    message: 'Getting history of point withdrawals ...',
    isLoading: true,
  });
  const [isLoading, setIsLoading] = useState(false);

  const getRecyclesHandler = async () => {
    setIsLoading(true);
    setAlert({
      message: 'Getting history of point withdrawals ...',
      isLoading: true,
    });
    try {
      const response = await staffGetPointWithdrawalsHistory(session?.user.accessToken as string);
      if (response.success) {
        const turncatedResponseData = response.success.data.map((pointWithdrawal: any) => ({
          ...pointWithdrawal,
        }));
        const sortedTurncatedResponseData = turncatedResponseData.sort((a: any, b: any) => {
          if (a.createdAt > b.createdAt) return -1;
          if (a.createdAt < b.createdAt) return 1;
          return 0;
        });
        setPointWithdrawals(sortedTurncatedResponseData);
        setAlert({
          message: `Total history of point withdrawals: ${response.success.data.length}`,
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
        const response = await staffGetPointWithdrawalsHistory(session?.user.accessToken as string);
        if (response.success) {
          const turncatedResponseData = response.success.data.map((pointWithdrawal: any) => ({
            ...pointWithdrawal,
          }));
          const sortedTurncatedResponseData = turncatedResponseData.sort((a: any, b: any) => {
            if (a.date > b.date) return -1;
            if (a.date < b.date) return 1;
            return 0;
          });
          setPointWithdrawals(sortedTurncatedResponseData);
          setAlert({
            message: `Total history of point withdrawals: ${response.success.data.length}`,
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
  }, [session?.user.accessToken, setPointWithdrawals]);

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
        <DataTable
          itemsPerPage={10}
          alert={alert}
          headers={[
            'ID',
            // 'Date',
            'Requester',
            'Amount',
            'Withdraw To',
            'No. Telp / VA / Rek',
            'Description',
            'Withdrawal Status',
          ]}
          datas={pointWithdrawals}
          dataKey="id"
          dataMappings={{
            id: 'id',
            // date: 'date',
            requester: 'point.user.name',
            amount: 'amount',
            type: 'type',
            typeValue: 'typeValue',
            description: 'description',
            pointWithdrawalStatusId: 'pointWithdrawalStatusId',
          }}
          dataConditionalValue={{
            // date: (data: any) => new Date(data).toLocaleString('id-ID'),
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
          actions={[{
            size: 'sm',
            variant: 'secondary',
            className: 'rounded-md px-1',
            onClick: (data: any) => router.push(`/staff/point-withdrawals/${data.id}`),
            children: 'View',
          }]}
        />
      </div>
    </div>
  );
}
