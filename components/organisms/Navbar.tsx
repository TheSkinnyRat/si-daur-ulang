import React from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import packages from '@/package.json';
import Link from '@components/atoms/Link';
import Button from '@components/atoms/Button';
import MenuUser from '@components/organisms/MenuUser';

const changeTheme = (theme: string) => {
  if (theme === 'light') {
    document.documentElement.classList.remove('dark');
    if (localStorage.theme) {
      localStorage.removeItem('theme');
    }
  } else if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else if (localStorage.theme === 'dark') {
    document.documentElement.classList.remove('dark');
    localStorage.removeItem('theme');
  }
};

export default function App() {
  return (
    <Disclosure as="nav" className="flex flex-wrap justify-between items-center sticky top-0 px-2 sm:px-5 py-1 z-50 backdrop-blur bg-slate-50/80 dark:bg-zinc-900/80 from-indigo-100 to-slate-100/80 sm:to-transparent dark:from-zinc-700 dark:to-zinc-700/80 dark:sm:to-transparent w-full rounded-b-xl">
      {({ open }) => (
        <>
          <Link href="/" variant="link" size="xl" className="grow sm:grow-0 inline-block m-2 font-extrabold cursor-pointer">
            <i className="fa-solid fa-recycle transition-none" />
            「 SI
            {' '}
            <span className="hidden sm:inline transition-none">Daur Ulang</span>
            {' '}
            」
          </Link>
          <div className="self-stretch hidden border-l border-slate-300 h-auto sm:inline-block mx-5 my-2" />
          <small className="hidden sm:inline font-bold bg-slate-200 text-slate-600 px-1 rounded">
            v
            {packages.version}
          </small>
          <Menu as="div">
            <Menu.Button as="div">
              <Button
                variant="primary"
                size="xs"
                className="px-2 py-1 rounded-full ml-2"
              >
                <i className="fa-solid fa-circle-half-stroke sm:mr-1" />
                <span className="hidden sm:inline">Theme</span>
              </Button>
            </Menu.Button>
            <Transition
              as="div"
              enter="ease-out duration-100"
              enterFrom="opacity-0 scale-0"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-75"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-0"
            >
              <Menu.Items className="absolute rounded-xl p-1 w-32 mt-1 ml-2 right-0 sm:left-0 bg-white shadow ring-1 ring-black ring-opacity-5 focus:outline-none">
                {/* <Menu.Item>
                  {({ active }) => (
                    <button
                      type="button"
                      onClick={() => changeTheme('system')}
                      className={`${
                        active
                          ? 'bg-indigo-500 text-slate-100'
                          : 'text-indigo-500'
                      } w-full text-left rounded px-2 py-1 text-sm`}
                    >
                      <i className="fa-fw fa-solid fa-computer" />
                      {' '}
                      System
                    </button>
                  )}
                </Menu.Item> */}
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="button"
                      onClick={() => changeTheme('light')}
                      className={`${
                        active
                          ? 'bg-indigo-500 text-slate-100'
                          : 'text-indigo-500'
                      } w-full text-left rounded-xl px-2 py-1 text-sm`}
                    >
                      <i className="fa-fw fa-solid fa-sun" />
                      {' '}
                      Light
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="button"
                      onClick={() => changeTheme('dark')}
                      className={`${
                        active
                          ? 'bg-indigo-500 text-slate-100'
                          : 'text-indigo-500'
                      } w-full text-left rounded-xl px-2 py-1 text-sm`}
                    >
                      <i className="fa-fw fa-solid fa-moon" />
                      {' '}
                      Dark
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
          <Disclosure.Button as="button" type="button" className="inline sm:hidden rounded text-center text-lg p-0.5 ml-2 font-mono text-indigo-500 dark:text-slate-200 hover:ring">
            {open ? <i className="fa-solid fa-times fa-fw" /> : <i className="fa-solid fa-bars fa-fw" />}
          </Disclosure.Button>
          <Disclosure.Panel static className={`${open ? 'flex' : 'hidden'} sm:flex flex-wrap place-items-center grow w-full sm:w-auto justify-end p-1`}>
            <div className="shrink-0 basis-full sm:basis-auto mb-2 border-t border-indigo-500 dark:border-slate-200" />
            <div className="shrink-0 basis-full sm:basis-auto mt-2 sm:mt-0">
              <MenuUser />
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
