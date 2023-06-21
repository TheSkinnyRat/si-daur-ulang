import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '@components/organisms/Navbar';
import Footer from '@components/organisms/Footer';
import CardAlert from '@components/organisms/CardAlert';
import CardSignIn from '@/components/organisms/CardSignIn';
import CardSignOut from '@/components/organisms/CardSignOut';

export default function App() {
  const router = useRouter();
  const { message } = router.query;
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Sign In - SI Daur Ulang</title>
        <meta name="description" content="Sistem Informasi Pengelolaan Daur Ulang Sampah" />
        <link rel="icon" href="/assets/images/favicon/favicon.svg" />
      </Head>
      <div className="flex flex-col h-full overflow-x-hidden bg-slate-50 dark:bg-zinc-900">
        <Navbar />
        <section id="secHome" className="grow flex overflow-y-auto bg-slate-50 dark:bg-zinc-900">
          <div className="container m-auto">
            <div className="max-w-sm m-auto">
              {message && <CardAlert message={message as string} type="success" className="font-semibold" /> }
              {session ? <CardSignOut /> : <CardSignIn />}
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
