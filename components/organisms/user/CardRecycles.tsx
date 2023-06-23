import React, { useEffect, useState } from 'react';
import { userGetRecycles } from '@/lib/api';
import { useSession } from 'next-auth/react';
import { IProps as IAlertProps } from '@/components/atoms/Alert';
import { useRouter } from 'next/router';
import DataTable from '@/components/atoms/DataTable';
import Link from '@/components/atoms/Link';
import Button from '@/components/atoms/Button';

export default function App(): JSX.Element {
  const { data: session } = useSession({
    required: true,
  });
  const router = useRouter();
  const [recycles, setRecycles] = useState([]);
  const [alert, setAlert] = useState<IAlertProps>({
    message: 'Getting user recycles ...',
    isLoading: true,
  });
  const [isLoading, setIsLoading] = useState(false);

  const getRecyclesHandler = async () => {
    setIsLoading(true);
    setAlert({
      message: 'Getting user recycles ...',
      isLoading: true,
    });
    try {
      const response = await userGetRecycles(session?.user.accessToken as string);
      if (response.success) {
        const turncatedResponseData = response.success.data.map((recycle: any) => ({
          ...recycle,
        }));
        const sortedTurncatedResponseData = turncatedResponseData.sort((a: any, b: any) => {
          if (a.createdAt > b.createdAt) return -1;
          if (a.createdAt < b.createdAt) return 1;
          return 0;
        });
        setRecycles(sortedTurncatedResponseData);
        setAlert({
          message: `Total user recycles: ${response.success.data.length}`,
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
        const response = await userGetRecycles(session?.user.accessToken as string);
        if (response.success) {
          const turncatedResponseData = response.success.data.map((recycle: any) => ({
            ...recycle,
          }));
          const sortedTurncatedResponseData = turncatedResponseData.sort((a: any, b: any) => {
            if (a.createdAt > b.createdAt) return -1;
            if (a.createdAt < b.createdAt) return 1;
            return 0;
          });
          setRecycles(sortedTurncatedResponseData);
          setAlert({
            message: `Total user recycles: ${response.success.data.length}`,
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
          <Link
            href="/user/recycles/add"
            variant="primary"
            size="xs"
            className="px-2 py-1 rounded-full"
          >
            <i className="fa-solid fa-plus mr-1" />
            New Request
          </Link>
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
            'Weight',
            'Delivery',
            'Actual Type',
            'Actual Weight',
            'Actual Point',
            'Recycle Status',
          ]}
          datas={recycles}
          dataKey="id"
          dataMappings={{
            id: 'id',
            type: 'type',
            weight: 'weight',
            selfDelivery: 'selfDelivery',
            actualType: 'actualType',
            actualWeight: 'actualWeight',
            actualPoint: 'actualPoint',
            recycleStatusId: 'recycleStatusId',
          }}
          dataConditionalValue={{
            selfDelivery: (data: any) => {
              if (data === true) return 'Self Delivery';
              return 'Driver';
            },
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
            variant: 'secondary',
            className: 'rounded-md px-1',
            onClick: (data: any) => router.push(`/user/recycles/${data.id}`),
            children: (
              <i className="fa-fw fa-solid fa-eye" />
            ),
          }]}
        />
      </div>
    </div>
  );
}
