import React, { useState } from 'react';
import Alert, { IProps as IAlertProps } from '@components/atoms/Alert';
import { useRouter } from 'next/router';
import { signUp, ISignUpData } from '@/lib/api';
import Button from '@components/atoms/Button';
import Link from '@components/atoms/Link';

const initialAlert: IAlertProps = {
  type: 'primary',
  message: (
    <>
      <i className="fa-solid fa-user-plus transition-none mr-2" />
      Sign Up
    </>
  ),
};

export default function App() {
  const router = useRouter();
  const [alert, setAlert] = useState(initialAlert);
  const [inputValue, setInputValue] = useState<ISignUpData>({
    idCard: '',
    email: '',
    password: '',
    rePassword: '',
    name: '',
    phone: '',
    address: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const formSignUpHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setAlert({
      type: 'primary',
      message: 'Processing ...',
      isLoading: true,
    });
    try {
      const response = await signUp(inputValue);
      if (response.success) {
        setAlert({
          type: 'success',
          message: response.success.data.message,
          isLoading: false,
        });
        router.push({
          pathname: '/auth/signin',
          query: { message: response.success.data.message },
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

  return (
    <div className="my-5 rounded border border-slate-200 shadow dark:border-zinc-700">
      <div className="rounded-t text-center text-xl border-b border-slate-300 bg-slate-200 dark:border-zinc-800 dark:bg-zinc-800 p-3 font-bold text-indigo-500 dark:text-slate-200">
        <Alert type={alert.type} message={alert.message} isLoading={alert.isLoading} />
      </div>
      <div className="p-4">
        <form className="grid grid-cols-none md:grid-cols-12 gap-3" onSubmit={formSignUpHandler}>
          <label className="block col-span-full" htmlFor="idCard">
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
          <label className="block md:col-span-6" htmlFor="email">
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
          <label className="block md:col-span-6" htmlFor="name">
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
          <label className="block md:col-span-6" htmlFor="password">
            <span className="text-slate-700 dark:text-slate-200">Password</span>
            <input
              type="password"
              id="password"
              required
              disabled={isLoading}
              value={inputValue.password}
              onChange={(e) => setInputValue({ ...inputValue, password: e.target.value })}
              className="w-full mt-1 rounded-md border dark:bg-zinc-600 dark:text-slate-100 border-slate-300 dark:border-zinc-600 px-3 py-1 placeholder-slate-300 dark:placeholder-zinc-200 placeholder-opacity-50 outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:ring-zinc-200 disabled:opacity-50"
            />
          </label>
          <label className="block md:col-span-6" htmlFor="rePassword">
            <span className="text-slate-700 dark:text-slate-200">Retype Password</span>
            <input
              type="password"
              id="rePassword"
              required
              disabled={isLoading}
              value={inputValue.rePassword}
              onChange={(e) => setInputValue({ ...inputValue, rePassword: e.target.value })}
              className="w-full mt-1 rounded-md border dark:bg-zinc-600 dark:text-slate-100 border-slate-300 dark:border-zinc-600 px-3 py-1 placeholder-slate-300 dark:placeholder-zinc-200 placeholder-opacity-50 outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:ring-zinc-200 disabled:opacity-50"
            />
          </label>
          <label className="block col-span-full" htmlFor="phone">
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
          <label className="block col-span-full" htmlFor="address">
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
          <div className="mt-2 md:col-start-1 lg:col-start-1 xl:col-start-1 col-span-full">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-md p-1"
            >
              Submit
            </Button>
          </div>
        </form>
        <hr className="w-full h-px mt-8 mb-4 bg-gray-200 border-0 dark:bg-gray-700" />
        <div className="text-slate-700 dark:text-slate-200 text-center">
          Have an account?
          <Link
            variant="linkInfo"
            href="/auth/signin"
            className="block"
          >
            <i className="fa-fw fa-solid fa-sign-in-alt mr-1 transition-none" />
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
