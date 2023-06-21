import React from 'react';
import ReactPaginate from 'react-paginate';

export interface IProps {
  onPageChange: (selectedItem: { selected: number }) => void;
  pageCount: number;
  pageRangeDisplayed?: number;
  marginPagesDisplayed?: number;
  renderOnZeroPageCount?: (() => void) | null;
  forcePage?: number;
}

export default function App({
  onPageChange,
  pageCount,
  pageRangeDisplayed,
  marginPagesDisplayed,
  renderOnZeroPageCount,
  forcePage,
}: IProps): JSX.Element {
  return (
    <ReactPaginate
      onPageChange={onPageChange}
      pageCount={pageCount}
      pageRangeDisplayed={pageRangeDisplayed || 3}
      marginPagesDisplayed={marginPagesDisplayed || 1}
      forcePage={pageCount && forcePage ? forcePage : undefined}
      containerClassName="flex place-items-center place-content-center sm:-space-x-px"
      pageClassName="leading-tight text-slate-500 bg-white border border-slate-300 hover:bg-slate-100 hover:text-slate-700 dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white"
      pageLinkClassName="inline-block px-3 py-1.5"
      breakLinkClassName="inline-block px-3 py-1.5 leading-tight text-slate-500 bg-white border border-slate-300 hover:bg-slate-100 hover:text-slate-700 dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white"
      previousLinkClassName="inline-block px-3 py-1.5 ml-0 leading-tight text-slate-500 bg-white border border-slate-300 rounded-l-lg hover:bg-slate-100 hover:text-slate-700 dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white"
      nextLinkClassName="inline-block px-3 py-1.5 ml-0 leading-tight text-slate-500 bg-white border border-slate-300 rounded-r-lg hover:bg-slate-100 hover:text-slate-700 dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white"
      activeLinkClassName="text-indigo-700 bg-indigo-200 hover:bg-indigo-300 hover:text-indigo-800 dark:bg-zinc-500 dark:text-zinc-50 dark:hover:bg-zinc-600 dark:hover:text-zinc-100"
      disabledLinkClassName="opacity-30 cursor-not-allowed hover:text-slate-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-400"
      breakLabel="..."
      nextLabel={<i className="fa-solid fa-angle-right" />}
      previousLabel={<i className="fa-solid fa-angle-left" />}
      renderOnZeroPageCount={renderOnZeroPageCount}
    />
  );
}
