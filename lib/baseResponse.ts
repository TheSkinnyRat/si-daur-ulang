import type { NextApiResponse } from 'next';

export const ok = <DataType>(res: NextApiResponse, data: DataType): void => res.status(200).json({
  success: {
    code: 200,
    data,
  },
});

export const error = <MessageType>(
  res: NextApiResponse,
  code: number,
  message: MessageType) => res.status(code).json({
    error: {
      code,
      message,
    },
  });

const baseResponse = {
  ok,
  error,
};
export default baseResponse;
