import type { NextApiRequest, NextApiResponse } from 'next';
import baseResponse from '@lib/baseResponse';
import roleCheck from '@/lib/roleCheck';
import dbModels from '@database/mariadb/models';

const db: any = dbModels;
const Balance = db.balance;
const BalanceHistory = db.balanceHistory;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const user = await roleCheck(req.headers['x-jwt-payload'] as string, 'staff', res);
  if (!user) return undefined;
  if (req.method === 'GET') {
    try {
      const balanceHistories = await BalanceHistory.findAll({
        include: Balance,
      });

      return baseResponse.ok(res, balanceHistories);
    } catch (error: any) {
      return baseResponse.error(res, 500, error.message);
    }
  }
  return baseResponse.error(res, 405, 'Method not allowed');
}
