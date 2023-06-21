import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Navbar from '@components/organisms/Navbar';
import Footer from '@components/organisms/Footer';
import Link from '@components/atoms/Link';
import { useSession } from 'next-auth/react';

export default function App() {
  const { data: session } = useSession();
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
            <div className="flex flex-wrap items-center">
              <div className="basis-full shrink-0 md:basis-1/2 md:order-2 text-center p-3">
                <span className="dark:hidden">
                  <Image src="/assets/images/illustration/throw-garbage.svg" alt="throw garbage illustration" width="450" height="450" />
                </span>
                <span className="hidden dark:inline">
                  <Image src="/assets/images/illustration/throw-garbage.svg" alt="throw garbage illustration" width="450" height="450" />
                </span>
              </div>
              <div className="basis-full shrink-0 md:basis-1/2 md:order-1 text-center md:text-left dark:text-zinc-200">
                <h1 className="text-2xl pb-2 font-bold">
                  SI Daur Ulang
                </h1>
                <p className="">
                  Sistem Informasi
                  <br />
                  Pengelolaan Daur Ulang Sampah
                </p>
                {session ? (
                  <Link
                    variant="primary"
                    className="mt-2 px-2 py-1 rounded-lg inline-block"
                    href="/dashboard"
                  >
                    Dashboard
                    <i className="fa-solid fa-arrow-right ml-1" />
                  </Link>
                ) : (
                  <Link
                    variant="primary"
                    className="mt-2 px-2 py-1 rounded-lg inline-block"
                    href="/auth/signin"
                  >
                    <i className="fa-solid fa-sign-in mr-1" />
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
