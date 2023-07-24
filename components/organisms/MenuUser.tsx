import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from '@components/atoms/Link';
import { Session } from 'next-auth';
import Button from '../atoms/Button';

function ProfileMenuButtonValue({ session, open }: { session: Session, open: boolean }) {
  return (
    <span className="flex place-items-center transition-none p-0.5">
      <i className="fa-solid fa-user-circle fa-xl mr-1.5" />
      <span className="font-semibold transition-none break-all line-clamp-1 max-w-[7rem]">
        {session?.user.user.name || 'Loading' }
      </span>
      <span><i className={`ml-1 transition-transform fa-fw fa-solid fa-angle-down ${open ? 'fa-rotate-180' : ''}`} /></span>
    </span>
  );
}

function ButtonLogin() {
  return (
    <Link
      variant="success"
      className="px-2 py-1 rounded-lg inline-block"
      href="/auth/signin"
    >
      <i className="fa-solid fa-sign-in mr-1" />
      Login
    </Link>
  );
}

export default function App() {
  const { data: session } = useSession();
  const router = useRouter();

  const goToDashboard = () => {
    router.push('/dashboard');
  };

  const logoutAlert = () => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Are you sure you want to logout?')) {
      signOut();
    }
  };

  const ProfileMenu = (
    <Menu as="div" className="w-fit">
      <Menu.Button as="div">
        {({ open }) => (
          <Button
            variant="link"
            size="md"
            className="flex place-items-center my-1 sm:my-0 transition-none"
          >
            <ProfileMenuButtonValue session={session!} open={open} />
          </Button>
        )}
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
        <Menu.Items className="absolute rounded-xl p-1 w-32 mt-1 ml-2 left-0 sm:left-auto sm:right-0 bg-white shadow ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <button
                type="button"
                onClick={goToDashboard}
                className={`${
                  active
                    ? 'bg-indigo-500 text-slate-100'
                    : 'text-indigo-500'
                } w-full text-left rounded-xl px-2 py-1 text-sm`}
              >
                <i className="fa-fw fa-solid fa-tachometer transition-none" />
                {' '}
                Dashboard
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                type="button"
                onClick={logoutAlert}
                className={`${
                  active
                    ? 'bg-indigo-500 text-slate-100'
                    : 'text-indigo-500'
                } w-full text-left rounded-xl px-2 py-1 text-sm`}
              >
                <i className="fa-fw fa-solid fa-right-from-bracket transition-none" />
                {' '}
                Logout
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );

  if (!session && router.asPath.includes('/auth/signin')) {
    return null;
  }

  return session ? ProfileMenu : <ButtonLogin />;
}
