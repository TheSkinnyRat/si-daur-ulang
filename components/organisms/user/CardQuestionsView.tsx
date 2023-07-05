import React, { useState, useEffect } from 'react';
import Alert, { IProps as IAlertProps } from '@/components/atoms/Alert';
import { useSession } from 'next-auth/react';
import Link from '@/components/atoms/Link';
import Button from '@/components/atoms/Button';
import {
  userGetQuestion,
} from '@/lib/api';
import { ParsedUrlQuery } from 'querystring';

export interface IProps {
  query?: ParsedUrlQuery;
}

export default function App({ query }: IProps): JSX.Element {
  const queryId = parseInt(query?.id as string, 10);
  const { data: session } = useSession({
    required: true,
  });
  const [alert, setAlert] = useState<IAlertProps>({
    message: `Viewing question with id: ${queryId}`,
    isLoading: false,
  });
  const [question, setQuestion] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  const getQuestionHandler = async () => {
    setIsLoading(true);
    setAlert({
      type: 'info',
      message: 'Getting data ...',
      isLoading: true,
    });
    try {
      const response = await userGetQuestion(
        session?.user.accessToken as string,
        queryId,
      );
      if (response.success) {
        setQuestion(response.success.data[0]);
        setAlert({
          message: `Viewing question with id: ${queryId}`,
        });
        setIsLoading(false);
      }
    } catch (error: any) {
      setAlert({
        type: 'danger',
        message: `Error: ${error?.response?.data?.error?.message || error?.message || 'Unknown error'}`,
      });
    }
  };

  useEffect(() => {
    const initialGetQuestion = async () => {
      setIsLoading(true);
      setAlert({
        type: 'info',
        message: 'Getting data ...',
        isLoading: true,
      });
      try {
        const response = await userGetQuestion(
          session?.user.accessToken as string,
          queryId,
        );
        if (response.success) {
          setQuestion(response.success.data[0]);
          setAlert({
            message: `Viewing question with id: ${queryId}`,
          });
          setIsLoading(false);
        }
      } catch (error: any) {
        setAlert({
          type: 'danger',
          message: `Error: ${error?.response?.data?.error?.message || error?.message || 'Unknown error'}`,
        });
      }
    };
    if (session?.user.accessToken && queryId) initialGetQuestion();
  }, [queryId, session?.user.accessToken]);

  return (
    <div>
      <div className="bg-white dark:bg-zinc-800 border dark:border-zinc-700 relative shadow-md sm:rounded-lg overflow-hidden">
        <div className="m-2 mb-3">
          <Link
            href="/user/questions"
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
            onClick={getQuestionHandler}
            className="px-2 py-1 rounded-full ml-1"
          >
            <i className="fa-solid fa-rotate mr-1" />
            Refresh
          </Button>
        </div>
        <div className="px-4 py-3 text-xs text-slate-700 uppercase font-bold bg-slate-100 dark:bg-zinc-700 dark:text-zinc-300">
          <Alert type={alert.type} message={alert.message} isLoading={alert.isLoading} />
        </div>
        <div className="m-3">
          <span className="text-slate-700 dark:text-slate-200 font-semibold">Question</span>
          <div className="text-slate-700 dark:text-slate-200 max-w-lg mt-1 whitespace-pre-line">
            {question?.chat ?? '-'}
          </div>
        </div>
        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
        <div className="m-3">
          <span className="text-slate-700 dark:text-slate-200 font-semibold">
            <i className="fa-fw fa-solid fa-comments transition-none mr-1" />
            Answer
          </span>
          <div className="text-slate-700 dark:text-slate-200 max-w-lg mt-1 whitespace-pre-line">
            {question?.children?.chat ? `${question?.children?.chat}` : '-'}
          </div>
        </div>
        <div className="text-xs text-right text-slate-700 dark:text-slate-200 mr-1 mb-1 select-none">
          Powered by ChatGPT API from OpenAI
        </div>
      </div>
    </div>
  );
}
