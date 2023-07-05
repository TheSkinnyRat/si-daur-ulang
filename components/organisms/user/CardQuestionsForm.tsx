import React, { useState } from 'react';
import Alert, { IProps as IAlertProps } from '@/components/atoms/Alert';
import { useSession } from 'next-auth/react';
import Link from '@/components/atoms/Link';
import Button from '@/components/atoms/Button';
import {
  userAddQuestion,
  IUserAddQuestionData,
} from '@/lib/api';

function AnswerSkeleton() {
  return (
    <div role="status" className="space-y-2.5 animate-pulse max-w-lg mt-2">
      <div className="flex items-center w-full space-x-2">
        <div className="h-2.5 bg-slate-200 rounded-full dark:bg-zinc-700 w-32" />
        <div className="h-2.5 bg-slate-300 rounded-full dark:bg-zinc-600 w-24" />
        <div className="h-2.5 bg-slate-300 rounded-full dark:bg-zinc-600 w-full" />
      </div>
      <div className="flex items-center w-full space-x-2 max-w-[480px]">
        <div className="h-2.5 bg-slate-200 rounded-full dark:bg-zinc-700 w-full" />
        <div className="h-2.5 bg-slate-300 rounded-full dark:bg-zinc-600 w-full" />
        <div className="h-2.5 bg-slate-300 rounded-full dark:bg-zinc-600 w-24" />
      </div>
      <div className="flex items-center w-full space-x-2 max-w-[400px]">
        <div className="h-2.5 bg-slate-300 rounded-full dark:bg-zinc-600 w-full" />
        <div className="h-2.5 bg-slate-200 rounded-full dark:bg-zinc-700 w-80" />
        <div className="h-2.5 bg-slate-300 rounded-full dark:bg-zinc-600 w-full" />
      </div>
      <div className="flex items-center w-full space-x-2 max-w-[480px]">
        <div className="h-2.5 bg-slate-200 rounded-full dark:bg-zinc-700 w-full" />
        <div className="h-2.5 bg-slate-300 rounded-full dark:bg-zinc-600 w-full" />
        <div className="h-2.5 bg-slate-300 rounded-full dark:bg-zinc-600 w-24" />
      </div>
      <div className="flex items-center w-full space-x-2 max-w-[440px]">
        <div className="h-2.5 bg-slate-300 rounded-full dark:bg-zinc-600 w-32" />
        <div className="h-2.5 bg-slate-300 rounded-full dark:bg-zinc-600 w-24" />
        <div className="h-2.5 bg-slate-200 rounded-full dark:bg-zinc-700 w-full" />
      </div>
      <div className="flex items-center w-full space-x-2 max-w-[360px]">
        <div className="h-2.5 bg-slate-300 rounded-full dark:bg-zinc-600 w-full" />
        <div className="h-2.5 bg-slate-200 rounded-full dark:bg-zinc-700 w-80" />
        <div className="h-2.5 bg-slate-300 rounded-full dark:bg-zinc-600 w-full" />
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default function App(): JSX.Element {
  const { data: session } = useSession({
    required: true,
  });
  const [alert, setAlert] = useState<IAlertProps>({
    type: 'none',
    message: (
      <>
        <i className="fa-fw fa-solid fa-comments transition-none mr-1" />
        Answer
      </>
    ),
  });
  const [inputValue, setInputValue] = useState<IUserAddQuestionData>({
    question: '',
  });
  const [answer, setAnswer] = useState<string>('');
  const [answeredQuestion, setAnsweredQuestion] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const newQuestionHandler = () => {
    setInputValue({
      question: '',
    });
    setAnswer('');
    setAnsweredQuestion('');
  };

  const typingAnimation = (
    text: string,
    setText: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    const textArray = text.split('');
    textArray.forEach((letter, index) => {
      setTimeout(() => {
        setText((prev) => prev + letter);
      }, 10 * index);
    });
  };

  const formAddRecycleHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setAlert({
      type: 'none',
      isLoading: true,
      message: 'Loading...',
    });
    try {
      const response = await userAddQuestion(
        session!.user.accessToken,
        inputValue,
      );
      if (response.success) {
        setAlert({
          type: 'none',
          message: (
            <>
              <i className="fa-fw fa-solid fa-comments transition-none mr-1" />
              Answer
            </>
          ),
        });
        typingAnimation(response.success.data.answer, setAnswer);
        setAnsweredQuestion(response.success.data.question);
      }
    } catch (error: any) {
      setIsLoading(false);
      setAlert({
        type: 'danger',
        message: `Error: ${error?.response?.data?.error?.message || error?.message || 'Unknown error'}`,
        isLoading: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-white dark:bg-zinc-800 border dark:border-zinc-700 relative shadow-md sm:rounded-lg overflow-hidden">
        <div className="m-2 mb-3">
          <Link
            href="/user/questions"
            size="xs"
            className="mb-3 px-2 py-1 rounded-full"
          >
            <i className="fa-solid fa-clock-rotate-left mr-1" />
            Question History
          </Link>
        </div>
        <div className="px-4 py-3 text-xs text-slate-700 uppercase font-bold bg-slate-100 dark:bg-zinc-700 dark:text-zinc-300">
          Question And Answer
        </div>
        {!answeredQuestion ? (
          <form className="grid grid-cols-none md:grid-cols-12 m-3" onSubmit={formAddRecycleHandler}>
            <label className="block col-span-full md:col-span-7 lg:col-span-6 xl:col-span-5" htmlFor="question">
              <span className="text-slate-700 dark:text-slate-200">Ask Question</span>
              <textarea
                id="question"
                rows={3}
                disabled={isLoading}
                value={inputValue.question}
                onChange={(e) => setInputValue({ ...inputValue, question: e.target.value })}
                placeholder="Apakah baterai bisa didaur ulang?"
                className="w-full mt-1 rounded-md border dark:bg-zinc-600 dark:text-slate-100 border-slate-300 dark:border-zinc-600 px-3 py-1 placeholder-slate-600 dark:placeholder-zinc-200 placeholder-opacity-50 dark:placeholder-opacity-50 outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:ring-zinc-200 disabled:opacity-50"
              />
            </label>
            <div className="mt-2 md:col-start-1 lg:col-start-1 xl:col-start-1 col-span-full md:col-span-3 lg:col-span-2 xl:col-span-1">
              <Button
                type="submit"
                size="sm"
                disabled={isLoading}
                className="w-full rounded-md p-1"
              >
                Submit
              </Button>
            </div>
          </form>
        ) : (
          <div className="m-3">
            <span className="text-slate-700 dark:text-slate-200 font-semibold">Question</span>
            <div className="text-slate-700 dark:text-slate-200 max-w-lg mt-1 whitespace-pre-line">
              {answeredQuestion}
            </div>
          </div>
        )}
        {(isLoading || answer) && (
          <>
            <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
            <div className="m-3">
              <span className="text-slate-700 dark:text-slate-200 font-semibold">
                <Alert
                  type={alert.type}
                  message={alert.message}
                  isLoading={alert.isLoading}
                />
              </span>
              {isLoading && (
                <AnswerSkeleton />
              )}
              {answer && (
                <div className="text-slate-700 dark:text-slate-200 max-w-lg mt-1 whitespace-pre-line">
                  {answer}
                </div>
              )}
            </div>
          </>
        )}
        {answer && (
          <Button
            size="sm"
            variant="linkInfo"
            className="ml-3 mb-3"
            onClick={newQuestionHandler}
          >
            Submit Another Question
          </Button>
        )}
        <div className="text-xs text-right text-slate-700 dark:text-slate-200 mr-1 mb-1 select-none">
          Powered by ChatGPT API from OpenAI
        </div>
      </div>
    </div>
  );
}
