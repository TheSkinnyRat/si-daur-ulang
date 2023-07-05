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
      <div className={`${isSideMenuOpen ? 'transform-none' : '-translate-x-full'} md:transform-none grow flex flex-col absolute shadow inset-0 pt-16 pb-28 sm:pb-16 md:pb-0 z-50 bg-slate-200 dark:bg-zinc-800 md:static md:pt-0 md:z-auto md:bg-slate-300/30 md:dark:bg-zinc-800/30`}>
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
                <div className="p-1 mb-1 font-bold text-slate-900 dark:text-zinc-100">RECYCLES</div>
                <LinkSideBar
                  href="/user/recycles"
                  onClick={() => setIsSideMenuOpen(false)}
                  active={router.pathname.split('/')[2] === 'recycles'}
                >
                  <div className="flex place-items-center gap-1 transition-none">
                    <i className="fa-fw fa-solid fa-recycle transition-none" />
                    <span className="grow transition-none">Recycles</span>
                  </div>
                </LinkSideBar>
                <LinkSideBar
                  href="/user/questions/add"
                  onClick={() => setIsSideMenuOpen(false)}
                  active={router.pathname.split('/')[2] === 'questions'}
                >
                  <div className="flex place-items-center gap-1 transition-none">
                    <i className="fa-fw fa-solid fa-question transition-none" />
                    <span className="grow transition-none">Question</span>
                  </div>
                </LinkSideBar>
                <div className="my-3 w-auto h-0.5 bg-slate-300 dark:bg-zinc-700 rounded-full" />
                <div className="p-1 mb-1 font-bold text-slate-900 dark:text-zinc-100">POINT</div>
                <LinkSideBar
                  href="/user/point"
                  onClick={() => setIsSideMenuOpen(false)}
                  active={router.pathname.endsWith('point')}
                >
                  <div className="flex place-items-center gap-1 transition-none">
                    <i className="fa-fw fa-solid fa-coins transition-none" />
                    <span className="grow transition-none">Point</span>
                  </div>
                </LinkSideBar>
                <LinkSideBar
                  href="/user/point/histories"
                  onClick={() => setIsSideMenuOpen(false)}
                  active={router.pathname.endsWith('point/histories')}
                >
                  <div className="flex place-items-center gap-1 transition-none">
                    <i className="fa-fw fa-solid fa-coins transition-none" />
                    <span className="grow transition-none">Point History</span>
                  </div>
                </LinkSideBar>
                <div className="my-3 w-auto h-0.5 bg-slate-300 dark:bg-zinc-700 rounded-full" />
                <div className="p-1 mb-1 font-bold text-slate-900 dark:text-zinc-100">WITHDRAW</div>
                <LinkSideBar
                  href="/user/point/withdraws/add"
                  onClick={() => setIsSideMenuOpen(false)}
                  active={router.pathname.endsWith('point/withdraws/add')}
                >
                  <div className="flex place-items-center gap-1 transition-none">
                    <i className="fa-fw fa-solid fa-money-bill-wave transition-none" />
                    <span className="grow transition-none">Withdraw Request</span>
                  </div>
                </LinkSideBar>
                <LinkSideBar
                  href="/user/point/withdraws"
                  onClick={() => setIsSideMenuOpen(false)}
                  active={router.pathname.endsWith('point/withdraws')}
                >
                  <div className="flex place-items-center gap-1 transition-none">
                    <i className="fa-fw fa-solid fa-money-bill-wave transition-none" />
                    <span className="grow transition-none">Withdraw History</span>
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
