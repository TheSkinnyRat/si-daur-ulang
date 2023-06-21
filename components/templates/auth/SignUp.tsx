import React from 'react';
import Head from 'next/head';
import Navbar from '@components/organisms/Navbar';
import Footer from '@components/organisms/Footer';
import CardSignUp from '@/components/organisms/CardSignUp';
import CardSignOut from '@/components/organisms/CardSignOut';
import { useSession } from 'next-auth/react';

export default function App() {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Sign Up - SI Daur Ulang</title>
        <meta name="description" content="Sistem Informasi Pengelolaan Daur Ulang Sampah" />
        <link rel="icon" href="/assets/images/favicon/favicon.svg" />
      </Head>
      <div className="flex flex-col h-full overflow-x-hidden bg-slate-50 dark:bg-zinc-900">
        <Navbar />
        <section id="secHome" className="grow flex overflow-y-auto bg-slate-50 dark:bg-zinc-900">
          <div className="container m-auto">
            <div className="max-w-xl m-auto">
              {session ? <CardSignOut /> : <CardSignUp />}
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
