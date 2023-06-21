import React from 'react';

export interface IProps {
  onClick?: () => void;
  active?: boolean;
  children?: React.ReactNode;
}

export default function App({ onClick, active, children }: IProps): JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${
        active ? 'bg-slate-300 dark:bg-zinc-600 text-slate-900 dark:text-zinc-100' : ''
      } w-full mb-1 rounded-xl py-2 px-3 text-left focus:ring focus:ring-slate-200 dark:focus:ring-zinc-700 hover:bg-slate-300 hover:text-slate-900 dark:hover:bg-zinc-600 dark:hover:text-zinc-100 outline-none disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
}
