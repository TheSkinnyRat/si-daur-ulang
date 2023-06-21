import React from 'react';

export default function App() {
  return (
    <footer className="shrink-0 flex flex-wrap justify-center items-center h-12 px-2 md:px-5 py-1 bg-slate-200 dark:bg-zinc-800 dark:text-zinc-200 drop-shadow w-full">
      <div className="text-sm">
        <span>
          &copy;
          {' '}
          <a href="https://instagram.com/The.Skinny.Rat" className="underline" target="_blank" rel="noreferrer">Purwa Sabrang</a>
          {' '}
          2023 -
          {' '}
          {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
}
