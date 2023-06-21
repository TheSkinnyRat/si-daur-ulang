import React from 'react';
import Head from 'next/head';
import Navbar from '@components/organisms/Navbar';
import Footer from '@components/organisms/Footer';
import CardLogin from '@/components/organisms/CardSignIn';
import CardAlert from '@components/organisms/CardAlert';
import { useRouter } from 'next/router';

export default function App() {
  const router = useRouter();
  const { error } = router.query;

  return (
    <>
      <Head>
        <title>SI Daur Ulang</title>
        <meta name="description" content="Sistem Informasi Pengelolaan Daur Ulang Sampah" />
        <link rel="icon" href="/assets/images/favicon/favicon.svg" />
      </Head>
      <div className="flex flex-col h-full overflow-x-hidden bg-slate-50 dark:bg-zinc-900">
        <Navbar />
        <section id="secHome" className="grow flex overflow-y-auto bg-slate-50 dark:bg-zinc-900">
          <div className="container m-auto">
            <div className="max-w-sm m-auto">
              <CardAlert message={`Error: ${error || 'Unknown Error'}`} type="danger" />
              <CardLogin />
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
