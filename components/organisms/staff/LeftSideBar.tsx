import React from 'react';
import Link from '@components/atoms/Link';
import { useRouter } from 'next/router';
import LinkSideBar from '@components/atoms/LinkSideBar';

export interface IProps {
  isSideMenuOpen: boolean;
  setIsSideMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function App({ isSideMenuOpen, setIsSideMenuOpen }: IProps): JSX.Element {
  const router = useRouter();

  return (
    <div className="flex overflow-y-auto basis-0 md:basis-4/12 lg:basis-3/12 2xl:basis-2/12">
      <div className={`${isSideMenuOpen ? 'transform-none' : '-translate-x-full'} md:transform-none grow flex flex-col absolute shadow inset-0 pt-16 z-50 bg-slate-200 dark:bg-zinc-800 md:static md:pt-0 md:z-auto md:bg-slate-300/30 md:dark:bg-zinc-800/30`}>
        <div className="flex flex-nowrap place-items-center mx-auto relative top-0 px-2 py-1 z-50 transition-none">
          <Link href="/" variant="link" size="xl" className="grow sm:grow-0 inline-block m-2 font-extrabold cursor-pointer">
            <i className="fa-solid fa-recycle transition-none" />
            「 SI Daur Ulang 」
          </Link>
        </div>
        <div className="grow flex min-h-0">
          <div className="grow overflow-auto">
            <div className="block">
              <div className="p-3 text-sm font-bold text-slate-500 dark:text-zinc-400">
                <div className="my-3 w-auto h-0.5 bg-slate-300 dark:bg-zinc-700 rounded-full" />
                <div className="p-1 mb-1 font-bold text-slate-900 dark:text-zinc-100">ACCOUNT</div>
                <LinkSideBar
                  href="/profile"
                  onClick={() => setIsSideMenuOpen(false)}
                  active={router.pathname.split('/')[1] === 'profile'}
                >
                  <div className="flex place-items-center gap-1 transition-none">
                    <i className="fa-fw fa-solid fa-user transition-none" />
                    <span className="grow transition-none">Profile</span>
                  </div>
                </LinkSideBar>
                <div className="my-3 w-auto h-0.5 bg-slate-300 dark:bg-zinc-700 rounded-full" />
                <div className="p-1 mb-1 font-bold text-slate-900 dark:text-zinc-100">RECYCLE</div>
                <LinkSideBar
                  href="/staff/recycles/request"
                  onClick={() => setIsSideMenuOpen(false)}
                  active={router.pathname.endsWith('recycles/request')}
                >
                  <div className="flex place-items-center gap-1 transition-none">
                    <i className="fa-fw fa-solid fa-recycle transition-none" />
                    <span className="grow transition-none">Self Delivery Request</span>
                  </div>
                </LinkSideBar>
                <LinkSideBar
                  href="/staff/recycles/accepted"
                  onClick={() => setIsSideMenuOpen(false)}
                  active={router.pathname.endsWith('recycles/accepted')}
                >
                  <div className="flex place-items-center gap-1 transition-none">
                    <i className="fa-fw fa-solid fa-recycle transition-none" />
                    <span className="grow transition-none">Accepted</span>
                  </div>
                </LinkSideBar>
                <LinkSideBar
                  href="/staff/recycles/verified"
                  onClick={() => setIsSideMenuOpen(false)}
                  active={router.pathname.endsWith('recycles/verified')}
                >
                  <div className="flex place-items-center gap-1 transition-none">
                    <i className="fa-fw fa-solid fa-recycle transition-none" />
                    <span className="grow transition-none">Completed</span>
                  </div>
                </LinkSideBar>
                <LinkSideBar
                  href="/staff/recycles/report"
                  onClick={() => setIsSideMenuOpen(false)}
                  active={router.pathname.endsWith('recycles/report')}
                >
                  <div className="flex place-items-center gap-1 transition-none">
                    <i className="fa-fw fa-solid fa-recycle transition-none" />
                    <span className="grow transition-none">Report</span>
                  </div>
                </LinkSideBar>
                <div className="my-3 w-auto h-0.5 bg-slate-300 dark:bg-zinc-700 rounded-full" />
                <div className="p-1 mb-1 font-bold text-slate-900 dark:text-zinc-100">POINT WITHDRAWAL</div>
                <LinkSideBar
                  href="/staff/point-withdrawals/request"
                  onClick={() => setIsSideMenuOpen(false)}
                  active={router.pathname.endsWith('point-withdrawals/request')}
                >
                  <div className="flex place-items-center gap-1 transition-none">
                    <i className="fa-fw fa-solid fa-money-bills transition-none" />
                    <span className="grow transition-none">Request</span>
                  </div>
                </LinkSideBar>
                <LinkSideBar
                  href="/staff/point-withdrawals/history"
                  onClick={() => setIsSideMenuOpen(false)}
                  active={router.pathname.endsWith('point-withdrawals/history')}
                >
                  <div className="flex place-items-center gap-1 transition-none">
                    <i className="fa-fw fa-solid fa-money-bills transition-none" />
                    <span className="grow transition-none">History</span>
                  </div>
                </LinkSideBar>
                <LinkSideBar
                  href="/staff/point-withdrawals/report"
                  onClick={() => setIsSideMenuOpen(false)}
                  active={router.pathname.endsWith('point-withdrawals/report')}
                >
                  <div className="flex place-items-center gap-1 transition-none">
                    <i className="fa-fw fa-solid fa-money-bills transition-none" />
                    <span className="grow transition-none">Report</span>
                  </div>
                </LinkSideBar>
                <div className="my-3 w-auto h-0.5 bg-slate-300 dark:bg-zinc-700 rounded-full" />
                <div className="p-1 mb-1 font-bold text-slate-900 dark:text-zinc-100">BALANCE</div>
                <LinkSideBar
                  href="/staff/balance"
                  onClick={() => setIsSideMenuOpen(false)}
                  active={router.pathname.endsWith('balance')}
                >
                  <div className="flex place-items-center gap-1 transition-none">
                    <i className="fa-fw fa-solid fa-wallet transition-none" />
                    <span className="grow transition-none">Balance</span>
                  </div>
                </LinkSideBar>
                <LinkSideBar
                  href="/staff/balance/histories"
                  onClick={() => setIsSideMenuOpen(false)}
                  active={router.pathname.endsWith('balance/histories')}
                >
                  <div className="flex place-items-center gap-1 transition-none">
                    <i className="fa-fw fa-solid fa-wallet transition-none" />
                    <span className="grow transition-none">History</span>
                  </div>
                </LinkSideBar>
                <LinkSideBar
                  href="/staff/balance/report"
                  onClick={() => setIsSideMenuOpen(false)}
                  active={router.pathname.endsWith('balance/report')}
                >
                  <div className="flex place-items-center gap-1 transition-none">
                    <i className="fa-fw fa-solid fa-wallet transition-none" />
                    <span className="grow transition-none">Report</span>
                  </div>
                </LinkSideBar>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
