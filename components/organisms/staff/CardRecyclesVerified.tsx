import React, { useEffect, useState } from 'react';
import { staffGetRecyclesVerified } from '@/lib/api';
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
  const [recycles, setRecycles] = useState([]);
  const [alert, setAlert] = useState<IAlertProps>({
    message: 'Getting verified recycles ...',
    isLoading: true,
  });
  const [isLoading, setIsLoading] = useState(false);

  const getRecyclesHandler = async () => {
    setIsLoading(true);
    setAlert({
      message: 'Getting verified recycles ...',
      isLoading: true,
    });
    try {
      const response = await staffGetRecyclesVerified(session?.user.accessToken as string);
      if (response.success) {
        const turncatedResponseData = response.success.data.map((recycle: any) => ({
          ...recycle,
        }));
        const sortedTurncatedResponseData = turncatedResponseData.sort((a: any, b: any) => {
          if (a.createdAt > b.createdAt) return 1;
          if (a.createdAt < b.createdAt) return -1;
          return 0;
        });
        setRecycles(sortedTurncatedResponseData);
        setAlert({
          message: `Total verified recycles: ${response.success.data.length}`,
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
        const response = await staffGetRecyclesVerified(session?.user.accessToken as string);
        if (response.success) {
          const turncatedResponseData = response.success.data.map((recycle: any) => ({
            ...recycle,
          }));
          const sortedTurncatedResponseData = turncatedResponseData.sort((a: any, b: any) => {
            if (a.createdAt > b.createdAt) return 1;
            if (a.createdAt < b.createdAt) return -1;
            return 0;
          });
          setRecycles(sortedTurncatedResponseData);
          setAlert({
            message: `Total verified recycles: ${response.success.data.length}`,
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
  }, [session?.user.accessToken, setRecycles]);

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
            'Type',
            'Weight (kg)',
            'Requester',
            'Address',
            'Recycle Status',
          ]}
          datas={recycles}
          dataKey="id"
          dataMappings={{
            id: 'id',
            type: 'type',
            weight: 'weight',
            requester: 'user.name',
            address: 'user.address',
            recycleStatusId: 'recycleStatusId',
          }}
          dataConditionalValue={{
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
          actions={[{
            size: 'sm',
            className: 'rounded-md px-1',
            onClick: (data: any) => router.push(`/staff/recycles/${data.id}`),
            children: 'View',
          }]}
        />
      </div>
    </div>
  );
}
