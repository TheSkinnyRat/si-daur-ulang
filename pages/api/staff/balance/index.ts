import type { NextApiRequest, NextApiResponse } from 'next';
import baseResponse from '@lib/baseResponse';
import roleCheck from '@/lib/roleCheck';
import dbModels from '@database/mariadb/models';
import { z } from 'zod';

const db: any = dbModels;
const Balance = db.balance;
const BalanceHistory = db.balanceHistory;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const user = await roleCheck(res.getHeader('x-jwt-payload') as string || req.headers['x-jwt-payload'] as string, 'staff', res);
  if (!user) return undefined;
  if (req.method === 'GET') {
    try {
      const balance = await Balance.findOne({
        where: {
          id: 1,
        },
      });
      if (!balance) return baseResponse.error(res, 404, 'Balance not found');

      return baseResponse.ok(res, balance);
    } catch (error: any) {
      return baseResponse.error(res, 500, error.message);
    }
  } else if (req.method === 'PATCH') {
    const bodySchema = z.object({
      amount: z.number().positive(),
      description: z.string().optional(),
    });

    try {
      if (typeof req.body !== 'object') return baseResponse.error(res, 400, 'Invalid body');
      req.body.amount = Number(req.body.amount);
      const body = bodySchema.parse(req.body);

      const balance = await Balance.findOne({
        where: {
          id: 1,
        },
      });
      if (!balance) return baseResponse.error(res, 404, 'Balance not found');

      balance.set({
        amount: Number(balance.amount) + body.amount,
      });
      await balance.save();

      await BalanceHistory.create({
        balanceId: balance.id,
        date: new Date(),
        type: 'credit',
        description: body.description,
        amount: body.amount,
        startBalance: Number(balance.amount) - body.amount,
        currentBalance: Number(balance.amount),
      });

      return baseResponse.ok(res, { message: 'Balance added' });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return baseResponse.error(
          res,
          400,
          error.issues[0].path[0]
            ? `${error.issues[0].path.join()}: ${error.issues[0].message}`
            : error.issues[0].message,
        );
      }
      return baseResponse.error(res, 500, error.message);
    }
  }
  return baseResponse.error(res, 405, 'Method not allowed');
}
