import React, { useState } from 'react';
import Alert, { IProps as IAlertProps } from '@components/atoms/Alert';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Button from '@components/atoms/Button';
import Link from '@components/atoms/Link';
import { ISignInData } from '@/lib/api';

const initialAlert: IAlertProps = {
  type: 'primary',
  message: (
    <>
      <i className="fa-solid fa-recycle transition-none mr-2" />
      SI Daur Ulang
    </>
  ),
};

export default function App() {
  const router = useRouter();
  const [alert, setAlert] = useState(initialAlert);
  const [inputValue, setInputValue] = useState<ISignInData>({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const signInHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setAlert({
      type: 'primary',
      message: 'Processing ...',
      isLoading: true,
    });
    try {
      const response = await signIn('credentials', {
        redirect: false,
        email: inputValue.email,
        password: inputValue.password,
      });
      if (!response?.ok) {
        setAlert({
          type: 'danger',
          message: response?.error as string,
        });
      } else {
        setAlert({
          type: 'success',
          message: 'Welcome!. Redirecting ...',
        });
        router.push('/');
      }
    } catch (error: any) {
      setAlert({
        type: 'danger',
        message: `Error: ${error?.message || 'Unknown error'}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded border border-slate-200 shadow dark:border-zinc-700">
      <div className="rounded-t text-center text-xl border-b border-slate-300 bg-slate-200 dark:border-zinc-800 dark:bg-zinc-800 p-3 font-bold text-indigo-500 dark:text-slate-200">
        <Alert type={alert.type} message={alert.message} isLoading={alert.isLoading} />
      </div>
      <div className="p-4">
        <form className="grid grid-cols-1 gap-6" onSubmit={signInHandle}>
          <label className="block" htmlFor="email">
            <span className="text-slate-700 dark:text-slate-200">Email address</span>
            <input
              type="email"
              id="email"
              onChange={(e) => setInputValue({ ...inputValue, email: e.target.value })}
              className="w-full mt-1 rounded-md border dark:bg-zinc-600 dark:text-slate-100 border-slate-300 dark:border-zinc-600 px-3 py-1 placeholder-slate-300 dark:placeholder-zinc-200 placeholder-opacity-50 outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:ring-zinc-200"
            />
          </label>
          <label className="block" htmlFor="password">
            <span className="text-slate-700 dark:text-slate-200">Password</span>
            <input
              type="password"
              id="email"
              onChange={(e) => setInputValue({ ...inputValue, password: e.target.value })}
              className="w-full mt-1 rounded-md border dark:bg-zinc-600 dark:text-slate-100 border-slate-300 dark:border-zinc-600 px-3 py-1 placeholder-slate-300 dark:placeholder-zinc-200 placeholder-opacity-50 outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:ring-zinc-200"
            />
          </label>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md p-1"
          >
            Login
          </Button>
        </form>
        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
          <span className="absolute px-3 font-medium -translate-x-1/2 left-1/2 text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-zinc-900">or</span>
        </div>
        <Link
          href="/auth/signup"
          className="block w-full text-center rounded-md p-1"
        >
          <i className="fa-fw fa-solid fa-user-plus mr-1" />
          Sign Up
        </Link>
      </div>
    </div>
  );
}
