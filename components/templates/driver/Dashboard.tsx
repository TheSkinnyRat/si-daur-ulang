import React, { useEffect } from 'react';
import Head from 'next/head';
import Footer from '@components/organisms/Footer';
import { useSession } from 'next-auth/react';
import ContentDashboard from '@/components/organisms/driver/ContentDashboard';
import { useRouter } from 'next/router';

export interface IProps {
  content?: string;
}

export default function App({ content }: IProps): JSX.Element {
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
  });

  useEffect(() => {
    if (session && session.user.user.userRole.id !== 2) {
      router.push('/dashboard');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user.user.userRole.id]);

  return (
    <>
      <Head>
        <title>Driver Dashboard - SI Daur Ulang</title>
        <meta name="description" content="Sistem Informasi Pengelolaan Daur Ulang Sampah" />
        <link rel="icon" href="/assets/images/favicon/favicon.svg" />
      </Head>
      <div className="flex flex-col h-full overflow-x-hidden">
        <section id="secDashboard" className="grow flex flex-col overflow-y-auto bg-slate-50 dark:bg-zinc-900">
          <div className="grow flex min-h-0">
            <ContentDashboard content={content} />
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
