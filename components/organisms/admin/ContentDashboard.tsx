import React, { useState } from 'react';
import Navbar from '@components/organisms/admin/Navbar';
import CardProfile from '@/components/organisms/admin/CardProfile';
import CardUsers from '@/components/organisms/admin/CardUsers';
import LeftSideBar from '@/components/organisms/admin/LeftSideBar';
import CardUsersForm from '@/components/organisms/admin/CardUsersForm';
import { ParsedUrlQuery } from 'querystring';

export interface IProps {
  content?: string;
  query?: ParsedUrlQuery;
}

export default function App({ content, query }: IProps): JSX.Element {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const displayContent = () => {
    if (content === 'profile') {
      return <CardProfile />;
    }
    if (content === 'users') {
      return <CardUsers />;
    }
    if (content === 'usersAdd') {
      return <CardUsersForm />;
    }
    if (content === 'usersEdit') {
      return <CardUsersForm query={query} />;
    }
    return null;
  };

  return (
    <div className="grow flex">
      <LeftSideBar isSideMenuOpen={isSideMenuOpen} setIsSideMenuOpen={setIsSideMenuOpen} />
      <div id="guildRoomContainer" className="overflow-y-scroll basis-full md:basis-8/12 lg:basis-9/12 2xl:basis-10/12">
        <Navbar
          isSideMenuOpen={isSideMenuOpen}
          setIsSideMenuOpen={setIsSideMenuOpen}
        />
        <div className="grid grid-cols-12 gap-2 my-3 mx-0 sm:mx-4 lg:mx-6 xl:mx-9 2xl:mx-40">
          <div className="col-span-12">
            {displayContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
