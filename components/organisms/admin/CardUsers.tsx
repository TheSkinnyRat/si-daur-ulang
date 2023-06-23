import React, { useEffect, useState } from 'react';
import { adminGetUsers, adminDeleteUser } from '@/lib/api';
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
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState<IAlertProps>({
    message: 'Getting users ...',
    isLoading: true,
  });
  const [isLoading, setIsLoading] = useState(false);

  const getUsersHandler = async () => {
    setIsLoading(true);
    setAlert({
      message: 'Getting users ...',
      isLoading: true,
    });
    try {
      const response = await adminGetUsers(session?.user.accessToken as string);
      if (response.success) {
        const turncatedResponseData = response.success.data.map((user: any) => ({
          ...user,
          idCard: `*${user.idCard.slice(-4)}`,
          phone: user.phone ? `*${user.phone.slice(-4)}` : null,
          address: user.address ? `${user.address.slice(0, 10)}...` : null,
        }));
        setUsers(turncatedResponseData);
        setAlert({
          message: `Total users: ${response.success.data.length}`,
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

  const deleteUserHandler = async (id: number) => {
    setIsLoading(true);
    setAlert({
      message: 'Deleting user ...',
      isLoading: true,
    });
    try {
      const response = await adminDeleteUser(session?.user.accessToken as string, id);
      if (response.success) {
        setAlert({
          message: response.success.data.message,
        });
        getUsersHandler();
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
    const initialGetUsers = async () => {
      setIsLoading(true);
      try {
        const response = await adminGetUsers(session?.user.accessToken as string);
        if (response.success) {
          const turncatedResponseData = response.success.data.map((user: any) => ({
            ...user,
            idCard: `*${user.idCard.slice(-4)}`,
            phone: user.phone ? `*${user.phone.slice(-4)}` : null,
            address: user.address ? `${user.address.slice(0, 10)}...` : null,
          }));
          setUsers(turncatedResponseData);
          setAlert({
            message: `Total users: ${response.success.data.length}`,
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
    if (session?.user.accessToken) initialGetUsers();
  }, [session?.user.accessToken, setUsers]);

  return (
    <div>
      <div className="bg-white dark:bg-zinc-800 border dark:border-zinc-700 relative shadow-md sm:rounded-lg overflow-hidden">
        <div className="m-2 mb-3">
          <Link
            href="/admin/users/add"
            variant="primary"
            size="xs"
            className="px-2 py-1 rounded-full"
          >
            <i className="fa-solid fa-plus mr-1" />
            Add Data
          </Link>
          <Button
            variant="primary"
            size="xs"
            disabled={isLoading}
            onClick={getUsersHandler}
            className="px-2 py-1 rounded-full ml-1"
          >
            <i className="fa-solid fa-rotate mr-1" />
            Refresh
          </Button>
        </div>
        <DataTable
          dataKey="id"
          itemsPerPage={10}
          alert={alert}
          headers={[
            'ID',
            'KTP',
            'Email',
            'Phone',
            'Name',
            'Address',
            'Role',
          ]}
          datas={users}
          dataMappings={{
            id: 'id',
            idCard: 'idCard',
            email: 'email',
            phone: 'phone',
            name: 'name',
            address: 'address',
            role: 'userRole.name',
          }}
          actions={[{
            size: 'sm',
            variant: 'secondary',
            className: 'rounded-md px-1 mr-1',
            onClick: (data: any) => router.push(`/admin/users/${data.id}`),
            children: (
              <i className="fa-fw fa-solid fa-pen-to-square" />
            ),
          }, {
            size: 'sm',
            variant: 'danger',
            disabled: isLoading,
            className: 'rounded-md px-1',
            onClick: (data: any) => deleteUserHandler(data.id),
            children: (
              <i className="fa-fw fa-solid fa-trash" />
            ),
          }]}
        />
      </div>
    </div>
  );
}
