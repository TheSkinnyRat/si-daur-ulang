import React, { useEffect, useState } from 'react';
import { userGetQuestions } from '@/lib/api';
import { IProps as IAlertProps } from '@/components/atoms/Alert';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import DataTable from '@/components/atoms/DataTable';
import Button from '@/components/atoms/Button';
import Link from '@/components/atoms/Link';

export default function App(): JSX.Element {
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
  });
  const [questionHistories, setQuestionHistories] = useState([]);
  const [alert, setAlert] = useState<IAlertProps>({
    message: 'Getting question history ...',
    isLoading: true,
  });
  const [isLoading, setIsLoading] = useState(false);

  const getQuestionsHandler = async () => {
    setIsLoading(true);
    setAlert({
      message: 'Getting question history ...',
      isLoading: true,
    });
    try {
      const response = await userGetQuestions(session?.user.accessToken as string);
      if (response.success) {
        const turncatedResponseData = response.success.data.map((question: any) => ({
          ...question,
        }));
        const sortedTurncatedResponseData = turncatedResponseData.sort((a: any, b: any) => {
          if (a.createdAt > b.createdAt) return -1;
          if (a.createdAt < b.createdAt) return 1;
          return 0;
        });
        setQuestionHistories(sortedTurncatedResponseData);
        setAlert({
          message: `Total question history: ${response.success.data.length}`,
        });
      }
    } catch (error: any) {
      setAlert({
        message: `Error: ${error?.response?.data?.error?.message || error?.message || 'Unknown error'}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initialGetQuestions = async () => {
      setIsLoading(true);
      try {
        const response = await userGetQuestions(session?.user.accessToken as string);
        if (response.success) {
          const turncatedResponseData = response.success.data.map((question: any) => ({
            ...question,
          }));
          const sortedTurncatedResponseData = turncatedResponseData.sort((a: any, b: any) => {
            if (a.createdAt > b.createdAt) return -1;
            if (a.createdAt < b.createdAt) return 1;
            return 0;
          });
          setQuestionHistories(sortedTurncatedResponseData);
          setAlert({
            message: `Total question history: ${response.success.data.length}`,
          });
        }
      } catch (error: any) {
        setAlert({
          message: `Error: ${error?.response?.data?.error?.message || error?.message || 'Unknown error'}`,
        });
      } finally {
        setIsLoading(false);
      }
    };
    if (session?.user.accessToken) initialGetQuestions();
  }, [session?.user.accessToken, setQuestionHistories]);

  return (
    <div>
      <div className="bg-white dark:bg-zinc-800 border dark:border-zinc-700 relative shadow-md sm:rounded-lg overflow-hidden">
        <div className="m-2 mb-3">
          <Link
            href="/user/questions/add"
            variant="link"
            size="xs"
            className="px-2 py-1 rounded-full transition-none"
          >
            <i className="fa-solid fa-arrow-left mr-1" />
            Back
          </Link>
          <Button
            variant="primary"
            size="xs"
            disabled={isLoading}
            onClick={getQuestionsHandler}
            className="px-2 py-1 rounded-full ml-1"
          >
            <i className="fa-solid fa-rotate mr-1" />
            Refresh
          </Button>
        </div>
        <div className="px-4 py-3 text-xs text-slate-700 dark:text-zinc-300 uppercase font-bold text-center bg-slate-200 dark:bg-zinc-600">
          Question History
        </div>
        <DataTable
          itemsPerPage={10}
          alert={alert}
          headers={[
            'ID',
            'Date',
            'Question',
          ]}
          datas={questionHistories}
          dataKey="id"
          dataMappings={{
            id: 'id',
            date: 'createdAt',
            question: 'chat',
          }}
          dataConditionalValue={{
            date: (data: any) => new Date(data).toLocaleString('id-ID'),
            question: (data: any) => (data.length > 50 ? `${data.substring(0, 50)}...` : data),
          }}
          actions={[{
            size: 'sm',
            variant: 'secondary',
            className: 'rounded-md px-1',
            onClick: (data: any) => router.push(`/user/questions/${data.id}`),
            children: 'View',
          }]}
        />
      </div>
    </div>
  );
}
