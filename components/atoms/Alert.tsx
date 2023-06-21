import React from 'react';

export interface IProps {
  type?: 'none' | 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'light' | 'dark';
  message: string | JSX.Element;
  isLoading?: boolean;
  className?: string;
}

export default function App({
  type,
  message,
  isLoading,
  className,
}: IProps): JSX.Element {
  const types = {
    none: '',
    primary: 'text-indigo-500 dark:text-slate-200',
    secondary: 'text-slate-500',
    danger: 'text-red-500 dark:text-red-400',
    success: 'text-emerald-500',
    warning: 'text-amber-500',
    info: 'text-sky-500',
    light: 'text-slate-100',
    dark: 'text-gray-700',
  };

  return (
    <div className={`${types[type || 'primary']} ${className}`}>
      {isLoading ? <i className="fa-solid fa-rotate fa-spin mr-2" /> : null}
      {message}
    </div>
  );
}
