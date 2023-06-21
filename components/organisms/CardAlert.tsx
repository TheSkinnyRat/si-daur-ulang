import React from 'react';
import Alert, { IProps as IAlertProps } from '@components/atoms/Alert';

export default function App({
  type,
  message,
  isLoading,
  className,
}: IAlertProps): JSX.Element {
  return (
    <div className="rounded shadow border bg-slate-100 dark:bg-zinc-800 border-slate-200 dark:border-zinc-900 mb-2">
      <div className="p-1 sm:p-2 text-center">
        <div className="line-clamp-1 break-all">
          <Alert
            type={type}
            message={message}
            isLoading={isLoading}
            className={className}
          />
        </div>
      </div>
    </div>
  );
}
