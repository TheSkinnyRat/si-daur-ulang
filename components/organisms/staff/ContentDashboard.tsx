import React, { useState } from 'react';
import NavbarRoom from '@components/organisms/staff/Navbar';
import LeftSideBar from '@/components/organisms/staff/LeftSideBar';
import CardProfile from '@/components/organisms/staff/CardProfile';
import CardRecyclesRequest from '@/components/organisms/staff/CardRecyclesRequest';
import CardRecyclesAccepted from '@/components/organisms/staff/CardRecyclesAccepted';
import CardRecyclesVerified from '@/components/organisms/staff/CardRecyclesVerified';
import CardRecyclesView from '@/components/organisms/staff/CardRecyclesView';
import CardRecyclesReport from '@/components/organisms/staff/CardRecyclesReport';
import CardPointWithdrawalsRequest from '@/components/organisms/staff/CardPointWithdrawalsRequest';
import CardPointWithdrawalsView from '@/components/organisms/staff/CardPointWithdrawalsView';
import CardPointWithdrawalsHistory from '@/components/organisms/staff/CardPointWithdrawalsHistory';
import CardBalance from '@/components/organisms/staff/CardBalance';
import CardBalanceForm from '@/components/organisms/staff/CardBalanceForm';
import CardBalanceHistories from '@/components/organisms/staff/CardBalanceHistories';
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
    if (content === 'recyclesReport') {
      return <CardRecyclesReport />;
    }
    if (content === 'pointWithdrawalsRequest') {
      return <CardPointWithdrawalsRequest />;
    }
    if (content === 'pointWithdrawalsView') {
      return <CardPointWithdrawalsView query={query} />;
    }
    if (content === 'pointWithdrawalsHistory') {
      return <CardPointWithdrawalsHistory />;
    }
    if (content === 'balance') {
      return <CardBalance />;
    }
    if (content === 'balanceAdd') {
      return <CardBalanceForm />;
    }
    if (content === 'balanceHistories') {
      return <CardBalanceHistories />;
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
