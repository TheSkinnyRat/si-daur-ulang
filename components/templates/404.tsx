import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Navbar from '@components/organisms/Navbar';
import Footer from '@components/organisms/Footer';

export default function App() {
  return (
    <>
      <Head>
        <title>SI Daur Ulang</title>
        <meta name="description" content="Sistem Informasi Pengelolaan Daur Ulang Sampah" />
        <link rel="icon" href="/assets/images/favicon/favicon.svg" />
      </Head>
      <div className="flex flex-col h-full overflow-x-hidden bg-slate-50 dark:bg-zinc-900">
        <Navbar />
        <section id="sec404" className="grow flex overflow-y-auto bg-slate-50 dark:bg-zinc-900">
          <div className="container m-auto">
            <div className="flex flex-wrap items-center">
              <div className="basis-full shrink-0 md:basis-1/2 md:order-2 text-center">
                <Image src="/assets/images/illustration/throw-garbage.svg" alt="throw garbage illustration" width="450" height="450" />
              </div>
              <div className="basis-full shrink-0 md:basis-1/2 md:order-1 text-center md:text-left dark:text-zinc-200">
                <h1 className="text-2xl pb-2 font-semibold">
                  404 - Page Not Found
                </h1>
                <p className="">
                  The page you are looking for does not exist.
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
