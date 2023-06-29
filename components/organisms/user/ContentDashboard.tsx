import React, { useState } from 'react';
import NavbarRoom from '@components/organisms/user/Navbar';
import LeftSideBar from '@/components/organisms/user/LeftSideBar';
import CardProfile from '@/components/organisms/user/CardProfile';
import CardRecycles from '@/components/organisms/user/CardRecycles';
import CardRecyclesView from '@/components/organisms/user/CardRecyclesView';
import CardRecyclesForm from '@/components/organisms/user/CardRecyclesForm';
import CardPoint from '@/components/organisms/user/CardPoint';
import CardPointHistories from '@/components/organisms/user/CardPointHistories';
import CardPointWithdraws from '@/components/organisms/user/CardPointWithdraws';
import CardPointWithdrawsForm from '@/components/organisms/user/CardPointWithdrawsForm';
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
    if (content === 'recycles') {
      return <CardRecycles />;
    }
    if (content === 'recyclesView') {
      return <CardRecyclesView query={query} />;
    }
    if (content === 'recyclesAdd') {
      return <CardRecyclesForm />;
    }
    if (content === 'point') {
      return <CardPoint />;
    }
    if (content === 'pointHistories') {
      return <CardPointHistories />;
    }
    if (content === 'pointWithdraws') {
      return <CardPointWithdraws />;
    }
    if (content === 'pointWithdrawsAdd') {
      return <CardPointWithdrawsForm />;
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
