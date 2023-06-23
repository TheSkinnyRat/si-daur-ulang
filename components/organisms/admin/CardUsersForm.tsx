import React, { useState, useEffect } from 'react';
import Alert, { IProps as IAlertProps } from '@/components/atoms/Alert';
import { useSession } from 'next-auth/react';
import Link from '@/components/atoms/Link';
import Button from '@/components/atoms/Button';
import {
  adminAddUser,
  adminGetUser,
  adminUpdateUser,
  IAddUserData,
  IUpdateUserData,
} from '@/lib/api';
import { ParsedUrlQuery } from 'querystring';

export interface IProps {
  query?: ParsedUrlQuery;
}

export default function App({ query }: IProps): JSX.Element {
  const queryId = parseInt(query?.id as string, 10);
  const { data: session } = useSession({
    required: true,
  });
  const [alert, setAlert] = useState<IAlertProps>({
    message: 'Add a new user',
    isLoading: false,
  });
  const [inputValue, setInputValue] = useState<IAddUserData | IUpdateUserData>({
    idCard: '',
    email: '',
    password: '',
    name: '',
    phone: '',
    address: '',
    userRoleId: 3,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isAddDone, setIsAddDone] = useState(false);

  const formAddUserHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setAlert({
      type: 'info',
      message: 'Adding data ...',
      isLoading: true,
    });
    try {
      const response = await adminAddUser(
        session!.user.accessToken,
        inputValue as IAddUserData,
      );
      if (response.success) {
        setIsAddDone(true);
        setAlert({
          type: 'success',
          message: response.success.data.message,
          isLoading: false,
        });
      }
    } catch (error: any) {
      setIsLoading(false);
      setAlert({
        type: 'danger',
        message: `Error: ${error?.response?.data?.error?.message || error?.message || 'Unknown error'}`,
        isLoading: false,
      });
    }
  };

  const formUpdateUserHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setAlert({
      type: 'info',
      message: 'Editing data ...',
      isLoading: true,
    });
    try {
      const response = await adminUpdateUser(
        session!.user.accessToken,
        queryId,
        {
          ...inputValue,
          password: inputValue.password ? inputValue.password : undefined,
        },
      );
      if (response.success) {
        setAlert({
          type: 'success',
          message: response.success.data.message,
          isLoading: false,
        });
      }
    } catch (error: any) {
      setAlert({
        type: 'danger',
        message: `Error: ${error?.response?.data?.error?.message || error?.message || 'Unknown error'}`,
        isLoading: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addAnotherButtonHandler = () => {
    setInputValue({
      idCard: '',
      email: '',
      password: '',
      name: '',
      phone: '',
      address: '',
      userRoleId: 3,
    });
    setAlert({
      message: 'Add a new user',
      isLoading: false,
    });
    setIsLoading(false);
    setIsAddDone(false);
  };

  useEffect(() => {
    const initialGetUser = async () => {
      setIsLoading(true);
      setAlert({
        type: 'info',
        message: 'Getting data ...',
        isLoading: true,
      });
      try {
        const response = await adminGetUser(
          session?.user.accessToken as string,
          queryId,
        );
        if (response.success) {
          setInputValue({
            idCard: response.success.data.idCard || '',
            email: response.success.data.email || '',
            password: '',
            name: response.success.data.name || '',
            phone: response.success.data.phone || '',
            address: response.success.data.address || '',
            userRoleId: response.success.data.userRoleId || 3,
          });
          setAlert({
            message: `Editing user with id: ${queryId}`,
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
    if (session?.user.accessToken && queryId) initialGetUser();
  }, [queryId, session?.user.accessToken]);

  return (
    <div>
      <div className="bg-white dark:bg-zinc-800 border dark:border-zinc-700 relative shadow-md sm:rounded-lg overflow-hidden">
        <div className="m-2 mb-3">
          <Link
            href="/admin/users/"
            variant="link"
            size="xs"
            className="px-2 py-1 rounded-full transition-none"
          >
            <i className="fa-solid fa-arrow-left mr-1" />
            View Data
          </Link>
        </div>
        <div className="px-4 py-3 text-xs text-slate-700 uppercase font-bold bg-slate-100 dark:bg-zinc-700 dark:text-zinc-300">
          <Alert type={alert.type} message={alert.message} isLoading={alert.isLoading} />
        </div>
        <form className="grid grid-cols-none md:grid-cols-12 gap-3 m-3" onSubmit={queryId ? formUpdateUserHandler : formAddUserHandler}>
          <label className="block col-span-full md:col-span-5 lg:col-span-4 xl:col-span-3" htmlFor="idCard">
            <span className="text-slate-700 dark:text-slate-200">ID Card (KTP)</span>
            <input
              type="number"
              id="idCard"
              required
              disabled={isLoading}
              value={inputValue.idCard}
              onChange={(e) => setInputValue({ ...inputValue, idCard: e.target.value })}
              className="w-full mt-1 rounded-md border dark:bg-zinc-600 dark:text-slate-100 border-slate-300 dark:border-zinc-600 px-3 py-1 placeholder-slate-300 dark:placeholder-zinc-200 placeholder-opacity-50 outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:ring-zinc-200 disabled:opacity-50"
            />
          </label>
          <label className="block md:col-start-1 lg:col-start-1 xl:col-start-1 col-span-full md:col-span-6 lg:col-span-5 xl:col-span-4" htmlFor="email">
            <span className="text-slate-700 dark:text-slate-200">Email</span>
            <input
              type="email"
              id="email"
              required
              disabled={isLoading}
              value={inputValue.email}
              onChange={(e) => setInputValue({ ...inputValue, email: e.target.value })}
              className="w-full mt-1 rounded-md border dark:bg-zinc-600 dark:text-slate-100 border-slate-300 dark:border-zinc-600 px-3 py-1 placeholder-slate-300 dark:placeholder-zinc-200 placeholder-opacity-50 outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:ring-zinc-200 disabled:opacity-50"
            />
          </label>
          <label className="block md:col-start-7 lg:col-start-6 xl:col-start-5 col-span-full md:col-span-6 lg:col-span-5 xl:col-span-4" htmlFor="password">
            <span className="text-slate-700 dark:text-slate-200">Password</span>
            <input
              type="password"
              id="password"
              required={!queryId}
              disabled={isLoading}
              value={inputValue.password}
              onChange={(e) => setInputValue({ ...inputValue, password: e.target.value })}
              className="w-full mt-1 rounded-md border dark:bg-zinc-600 dark:text-slate-100 border-slate-300 dark:border-zinc-600 px-3 py-1 placeholder-slate-300 dark:placeholder-zinc-200 placeholder-opacity-50 outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:ring-zinc-200 disabled:opacity-50"
            />
            {queryId ? (
              <span className="text-xs text-slate-700 dark:text-slate-200">
                Leave blank if you don&apos;t want to change the password
              </span>
            ) : undefined}
          </label>
          <label className="block md:col-start-1 lg:col-start-1 xl:col-start-1 col-span-full md:col-span-6 lg:col-span-5 xl:col-span-4" htmlFor="name">
            <span className="text-slate-700 dark:text-slate-200">Name</span>
            <input
              type="text"
              id="name"
              required
              disabled={isLoading}
              value={inputValue.name}
              onChange={(e) => setInputValue({ ...inputValue, name: e.target.value })}
              className="w-full mt-1 rounded-md border dark:bg-zinc-600 dark:text-slate-100 border-slate-300 dark:border-zinc-600 px-3 py-1 placeholder-slate-300 dark:placeholder-zinc-200 placeholder-opacity-50 outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:ring-zinc-200 disabled:opacity-50"
            />
          </label>
          <label className="block md:col-start-7 lg:col-start-6 xl:col-start-5 col-span-full md:col-span-6 lg:col-span-5 xl:col-span-4" htmlFor="phone">
            <span className="text-slate-700 dark:text-slate-200">Phone</span>
            <input
              type="number"
              id="phone"
              required
              disabled={isLoading}
              value={inputValue.phone}
              onChange={(e) => setInputValue({ ...inputValue, phone: e.target.value })}
              className="w-full mt-1 rounded-md border dark:bg-zinc-600 dark:text-slate-100 border-slate-300 dark:border-zinc-600 px-3 py-1 placeholder-slate-300 dark:placeholder-zinc-200 placeholder-opacity-50 outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:ring-zinc-200 disabled:opacity-50"
            />
          </label>
          <label className="block md:col-start-1 lg:col-start-1 xl:col-start-1 col-span-full md:col-span-8 lg:col-span-7 xl:col-span-6" htmlFor="address">
            <span className="text-slate-700 dark:text-slate-200">Address</span>
            <textarea
              id="address"
              rows={3}
              required
              disabled={isLoading}
              value={inputValue.address}
              onChange={(e) => setInputValue({ ...inputValue, address: e.target.value })}
              className="w-full mt-1 rounded-md border dark:bg-zinc-600 dark:text-slate-100 border-slate-300 dark:border-zinc-600 px-3 py-1 placeholder-slate-300 dark:placeholder-zinc-200 placeholder-opacity-50 outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:ring-zinc-200 disabled:opacity-50"
            />
          </label>
          <label className="block md:col-start-1 lg:col-start-1 xl:col-start-1 col-span-full md:col-span-4 lg:col-span-3 xl:col-span-2" htmlFor="userRoleId">
            <span className="text-slate-700 dark:text-slate-200">Role</span>
            <select
              id="userRoleId"
              required
              disabled={isLoading}
              value={inputValue.userRoleId}
              onChange={(e) => setInputValue({
                ...inputValue,
                userRoleId: parseInt(e.target.value, 10),
              })}
              className="w-full mt-1 rounded-md border dark:bg-zinc-600 dark:text-slate-100 border-slate-300 dark:border-zinc-600 px-3 py-1 placeholder-slate-300 dark:placeholder-zinc-200 placeholder-opacity-50 outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:ring-zinc-200 disabled:opacity-50"
            >
              <option value="0">Admin</option>
              <option value="1">Staff</option>
              <option value="2">Driver</option>
              <option value="3">User</option>
            </select>
          </label>
          <div className="mt-2 md:col-start-1 lg:col-start-1 xl:col-start-1 col-span-full md:col-span-3 lg:col-span-2 xl:col-span-1">
            <Button
              type={isAddDone ? 'button' : 'submit'}
              size="sm"
              variant={isAddDone ? 'secondary' : 'primary'}
              disabled={isAddDone ? false : isLoading}
              onClick={isAddDone ? () => addAnotherButtonHandler() : undefined}
              className="w-full rounded-md p-1"
            >
              {isAddDone ? 'Add Another' : undefined}
              {queryId ? 'Update' : undefined}
              {!queryId && !isAddDone ? 'Submit' : undefined}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
