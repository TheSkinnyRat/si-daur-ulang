import React, { useState } from 'react';
import NavbarRoom from '@components/organisms/staff/Navbar';
import LeftSideBar from '@/components/organisms/staff/LeftSideBar';
import CardProfile from '@/components/organisms/staff/CardProfile';
import CardRecyclesRequest from '@/components/organisms/staff/CardRecyclesRequest';
import CardRecyclesAccepted from '@/components/organisms/staff/CardRecyclesAccepted';
import CardRecyclesVerified from '@/components/organisms/staff/CardRecyclesVerified';
import CardRecyclesView from '@/components/organisms/staff/CardRecyclesView';
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
    if (content === 'recyclesRequest') {
      return <CardRecyclesRequest />;
    }
    if (content === 'recyclesAccepted') {
      return <CardRecyclesAccepted />;
    }
    if (content === 'recyclesVerified') {
      return <CardRecyclesVerified />;
    }
    if (content === 'recyclesView') {
      return <CardRecyclesView query={query} />;
    }
    return null;
  };

  return (
    <div className="grow flex">
      <LeftSideBar isSideMenuOpen={isSideMenuOpen} setIsSideMenuOpen={setIsSideMenuOpen} />
      <div id="guildRoomContainer" className="overflow-y-scroll basis-full md:basis-8/12 lg:basis-9/12 2xl:basis-10/12">
        <NavbarRoom
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
