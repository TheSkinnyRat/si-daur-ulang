import React from 'react';
import Head from 'next/head';
import Navbar from '@components/organisms/Navbar';
import Footer from '@components/organisms/Footer';
import Link from '@components/atoms/Link';

export default function App() {
  return (
    <>
      <Head>
        <title>Redirecting - SI Daur Ulang</title>
        <meta name="description" content="Sistem Informasi Pengelolaan Daur Ulang Sampah" />
        <link rel="icon" href="/assets/images/favicon/favicon.svg" />
      </Head>
      <div className="flex flex-col h-full overflow-x-hidden bg-slate-50 dark:bg-zinc-900">
        <Navbar />
        <section id="secHome" className="grow flex overflow-y-auto bg-slate-50 dark:bg-zinc-900">
          <div className="container m-auto">
            <div className="flex flex-wrap items-center">
              <div className="basis-full text-center dark:text-zinc-200">
                <h1 className="text-2xl pb-2 font-bold animate-pulse">
                  Redirecting ...
                </h1>
                <p className="">
                  If you are not redirected in a while,
                  {' '}
                  <Link
                    href="/"
                    variant="linkInfo"
                    className="font-bold"
                  >
                    Go to Home
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
