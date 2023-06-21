import React from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import packages from '@/package.json';
import MenuUser from '@components/organisms/MenuUser';
import Button from '@components/atoms/Button';

export interface IProps {
  isSideMenuOpen: boolean;
  setIsSideMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

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

export default function App({ isSideMenuOpen, setIsSideMenuOpen }: IProps): JSX.Element {
  return (
    <Disclosure as="nav" className="flex flex-wrap justify-between place-items-center sticky top-0 px-2 sm:px-5 py-2 z-50 backdrop-blur bg-slate-50/80 dark:bg-zinc-900/80 from-indigo-100 to-slate-100/80 sm:to-transparent dark:from-zinc-700 dark:to-zinc-700/80 dark:sm:to-transparent w-full rounded-b-xl">
      {({ open }) => (
        <>
          <small className="hidden md:inline font-bold bg-slate-200 text-slate-600 px-1 rounded">
            v
            {packages.version}
          </small>
          <Button
            variant="primary"
            size="xs"
            className="w-9 h-9 my-1 rounded-full ml-2 md:hidden"
            onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
          >
            <i className={`fa-fw fa-lg fa-solid ${isSideMenuOpen ? 'fa-xmark' : 'fa-arrow-right'}`} />
          </Button>
          <Menu as="div">
            <Menu.Button as="div">
              <Button
                variant="primary"
                size="xs"
                className="w-9 h-9 my-1 sm:w-auto sm:h-auto sm:px-2 sm:py-1 rounded-full ml-2"
              >
                <i className="fa-fw fa-lg fa-solid fa-circle-half-stroke" />
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
              <Menu.Items className="absolute rounded-xl p-1 w-32 mt-1 ml-2 left-0 bg-white shadow ring-1 ring-black ring-opacity-5 focus:outline-none">
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
          <Disclosure.Button as="button" type="button" className="ml-auto inline lg:hidden rounded text-center text-lg p-0.5 font-mono text-indigo-500 dark:text-slate-200 hover:ring">
            {open ? <i className="fa-solid fa-times fa-fw" /> : <i className="fa-solid fa-bars fa-fw" />}
          </Disclosure.Button>
          <Disclosure.Panel static className={`${open ? 'flex' : 'hidden'} lg:flex flex-wrap place-items-center grow w-full lg:w-auto justify-end p-1`}>
            <div className="shrink-0 basis-full lg:basis-auto mb-2 border-t border-indigo-500 dark:border-slate-200" />
            <div className="shrink-0 basis-full lg:basis-auto mt-2 lg:mt-0">
              <MenuUser />
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
