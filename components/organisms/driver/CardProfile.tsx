import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Alert, { IProps as IAlertProps } from '@/components/atoms/Alert';
import Button from '@/components/atoms/Button';
import {
  getProfile,
  updateProfile,
  IUpdateProfileData,
} from '@/lib/api';

export default function App(): JSX.Element {
  const { data: session } = useSession({
    required: true,
  });
  const [alert, setAlert] = useState<IAlertProps>({
    message: 'Account Profile',
    isLoading: false,
  });
  const [inputValue, setInputValue] = useState<IUpdateProfileData>({
    idCard: '',
    email: '',
    password: '',
    rePassword: '',
    name: '',
    phone: '',
    address: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const formUpdateProfileHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setAlert({
      type: 'info',
      message: 'Updating data ...',
      isLoading: true,
    });
    try {
      const response = await updateProfile(
        session!.user.accessToken,
        {
          ...inputValue,
          password: inputValue.password ? inputValue.password : undefined,
          rePassword: inputValue.rePassword ? inputValue.rePassword : undefined,
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

  useEffect(() => {
    const initialGetUser = async () => {
      setIsLoading(true);
      setAlert({
        type: 'info',
        message: 'Getting data ...',
        isLoading: true,
      });
      try {
        const response = await getProfile(session?.user.accessToken as string);
        if (response.success) {
          setInputValue({
            idCard: response.success.data.idCard || '',
            email: response.success.data.email || '',
            password: '',
            rePassword: '',
            name: response.success.data.name || '',
            phone: response.success.data.phone || '',
            address: response.success.data.address || '',
          });
          setAlert({
            message: `Editing profile with id: ${response.success.data.id}`,
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
    if (session?.user.accessToken) initialGetUser();
  }, [session?.user.accessToken]);

  return (
    <div>
      <div className="bg-white dark:bg-zinc-800 border dark:border-zinc-700 relative shadow-md sm:rounded-lg overflow-hidden">
        <div className="px-4 py-3 text-xs text-slate-700 uppercase font-bold bg-slate-100 dark:bg-zinc-700 dark:text-zinc-300">
          <Alert type={alert.type} message={alert.message} isLoading={alert.isLoading} />
        </div>
        <form className="grid grid-cols-none md:grid-cols-12 gap-3 m-3" onSubmit={formUpdateProfileHandler}>
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
          <label className="block md:col-start-7 lg:col-start-6 xl:col-start-5 col-span-full md:col-span-6 lg:col-span-5 xl:col-span-4" htmlFor="name">
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
          <label className="block md:col-start-1 lg:col-start-1 xl:col-start-1 col-span-full md:col-span-6 lg:col-span-5 xl:col-span-4" htmlFor="password">
            <span className="text-slate-700 dark:text-slate-200">Password</span>
            <input
              type="password"
              id="password"
              disabled={isLoading}
              value={inputValue.password}
              onChange={(e) => setInputValue({ ...inputValue, password: e.target.value })}
              className="w-full mt-1 rounded-md border dark:bg-zinc-600 dark:text-slate-100 border-slate-300 dark:border-zinc-600 px-3 py-1 placeholder-slate-300 dark:placeholder-zinc-200 placeholder-opacity-50 outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:ring-zinc-200 disabled:opacity-50"
            />
            <span className="text-xs text-slate-700 dark:text-slate-200">
              Leave blank if you don&apos;t want to change the password
            </span>
          </label>
          <label className="block md:col-start-7 lg:col-start-6 xl:col-start-5 col-span-full md:col-span-6 lg:col-span-5 xl:col-span-4" htmlFor="rePassword">
            <span className="text-slate-700 dark:text-slate-200">Retype Password</span>
            <input
              type="password"
              id="rePassword"
              disabled={isLoading}
              value={inputValue.rePassword}
              onChange={(e) => setInputValue({ ...inputValue, rePassword: e.target.value })}
              className="w-full mt-1 rounded-md border dark:bg-zinc-600 dark:text-slate-100 border-slate-300 dark:border-zinc-600 px-3 py-1 placeholder-slate-300 dark:placeholder-zinc-200 placeholder-opacity-50 outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:ring-zinc-200 disabled:opacity-50"
            />
            <span className="text-xs text-slate-700 dark:text-slate-200">
              Leave blank if you don&apos;t want to change the password
            </span>
          </label>
          <label className="block md:col-start-1 lg:col-start-1 xl:col-start-1 col-span-full md:col-span-5 lg:col-span-4 xl:col-span-3" htmlFor="phone">
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
          <div className="mt-2 md:col-start-1 lg:col-start-1 xl:col-start-1 col-span-full md:col-span-3 lg:col-span-2 xl:col-span-1">
            <Button
              type="submit"
              size="sm"
              disabled={isLoading}
              className="w-full rounded-md p-1"
            >
              Update
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
