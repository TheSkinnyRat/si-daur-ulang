/* eslint-disable react/button-has-type */
import React from 'react';

export interface IProps {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'light' | 'dark' |
  'link' | 'linkPrimary' | 'linkSecondary' | 'linkDanger' | 'linkSuccess' | 'linkWarning' | 'linkInfo' | 'linkLight' | 'linkDark' |
  'outline' | 'outlinePrimary' | 'outlineSecondary' | 'outlineDanger' | 'outlineSuccess' | 'outlineWarning' | 'outlineInfo' | 'outlineLight' | 'outlineDark';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

export default function App({
  onClick,
  type,
  variant,
  size,
  className,
  disabled,
  children,
}: IProps): JSX.Element {
  const variants = {
    primary: 'bg-indigo-500 enabled:hover:bg-indigo-600 text-slate-100 enabled:hover:text-slate-200 border border-indigo-500 || dark:bg-slate-200 dark:enabled:hover:bg-slate-300 dark:text-slate-800 dark:enabled:hover:text-slate-900 dark:border-slate-200',
    secondary: 'bg-slate-500 enabled:hover:bg-slate-600 text-slate-100 enabled:hover:text-slate-200 border border-slate-500',
    danger: 'bg-red-500 enabled:hover:bg-red-600 text-slate-100 enabled:hover:text-slate-200 border border-red-500',
    success: 'bg-emerald-500 enabled:hover:bg-emerald-600 text-slate-100 enabled:hover:text-slate-200 border border-emerald-500',
    warning: 'bg-amber-500 enabled:hover:bg-amber-600 text-slate-100 enabled:hover:text-slate-200 border border-amber-500',
    info: 'bg-sky-500 enabled:hover:bg-sky-600 text-slate-100 enabled:hover:text-slate-200 border border-sky-500',
    light: 'bg-slate-100 enabled:hover:bg-slate-200 text-slate-500 enabled:hover:text-slate-600 border border-slate-100',
    dark: 'bg-gray-700 enabled:hover:bg-gray-800 text-slate-100 enabled:hover:text-slate-200 border border-gray-700',

    link: 'text-indigo-500 enabled:hover:text-indigo-600 || dark:text-slate-200 dark:enabled:hover:text-slate-300',
    linkPrimary: 'text-indigo-500 enabled:hover:text-indigo-600 || dark:text-slate-200 dark:enabled:hover:text-slate-300',
    linkSecondary: 'text-slate-500 enabled:hover:text-slate-600',
    linkDanger: 'text-red-500 enabled:hover:text-red-600',
    linkSuccess: 'text-emerald-500 enabled:hover:text-emerald-600',
    linkWarning: 'text-amber-500 enabled:hover:text-amber-600',
    linkInfo: 'text-sky-500 enabled:hover:text-sky-600',
    linkLight: 'text-slate-100 enabled:hover:text-slate-200',
    linkDark: 'text-gray-700 enabled:hover:text-gray-800',

    outline: 'border border-indigo-500 enabled:hover:bg-indigo-500 text-indigo-500 enabled:hover:text-slate-100 || dark:border-slate-200 dark:enabled:hover:bg-slate-200 dark:text-slate-200 dark:enabled:hover:text-slate-800',
    outlinePrimary: 'border border-indigo-500 enabled:hover:bg-indigo-500 text-indigo-500 enabled:hover:text-slate-100 || dark:border-slate-200 dark:enabled:hover:bg-slate-200 dark:text-slate-200 dark:enabled:hover:text-slate-800',
    outlineSecondary: 'border border-slate-500 enabled:hover:bg-slate-500 text-slate-500 enabled:hover:text-slate-100',
    outlineDanger: 'border border-red-500 enabled:hover:bg-red-500 text-red-500 enabled:hover:text-slate-100',
    outlineSuccess: 'border border-emerald-500 enabled:hover:bg-emerald-500 text-emerald-500 enabled:hover:text-slate-100',
    outlineWarning: 'border border-amber-500 enabled:hover:bg-amber-500 text-amber-500 enabled:hover:text-slate-100',
    outlineInfo: 'border border-sky-500 enabled:hover:bg-sky-500 text-sky-500 enabled:hover:text-slate-100',
    outlineLight: 'border border-slate-100 enabled:hover:bg-slate-100 text-slate-100 enabled:hover:text-slate-500',
    outlineDark: 'border border-gray-700 enabled:hover:bg-gray-700 text-gray-700 enabled:hover:text-slate-100',
  };

  const sizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  const Button = (
    <button
      onClick={onClick}
      type={type || 'button'}
      className={`${variant ? variants[variant] : variants.primary} ${size ? sizes[size] : sizes.md} disabled:cursor-not-allowed disabled:opacity-50 transition-all ease-in-out ${className || ''}`}
      disabled={disabled}
    >
      {children || null}
    </button>
  );

  return Button;
}
