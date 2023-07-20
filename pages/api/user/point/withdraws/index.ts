import type { NextApiRequest, NextApiResponse } from 'next';
import baseResponse from '@lib/baseResponse';
import roleCheck from '@/lib/roleCheck';
import dbModels from '@database/mariadb/models';
import { z } from 'zod';

const db: any = dbModels;
const User = db.user;
const Point = db.point;
const PointHistory = db.pointHistory;
const PointWithdrawal = db.pointWithdrawal;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const user = await roleCheck(res.getHeader('x-jwt-payload') as string || req.headers['x-jwt-payload'] as string, 'user', res);
  if (!user) return undefined;
  if (req.method === 'GET') {
    try {
      const pointWithdrawal = await PointWithdrawal.findAll({
        include: [{
          model: Point,
          include: [{
            model: User,
          }],
        }],
        where: {
          '$point.user.id$': user.id,
        },
      });

      return baseResponse.ok(res, pointWithdrawal);
    } catch (error: any) {
      return baseResponse.error(res, 500, error.message);
    }
  } else if (req.method === 'POST') {
    const bodySchema = z.object({
      amount: z.number().min(10000),
      type: z.string().min(1).max(255).nonempty(),
      typeValue: z.string().min(1).max(255).nonempty(),
    });

    try {
      if (typeof req.body !== 'object') return baseResponse.error(res, 400, 'Invalid body');
      req.body.amount = Number(req.body.amount);
      const body = bodySchema.parse(req.body);

      const point = await Point.findOne({
        where: {
          userId: user.id,
        },
      });
      if (!point) return baseResponse.error(res, 400, 'You have no point');
      if (point.amount < body.amount) return baseResponse.error(res, 400, 'You have no enough point');

      await PointWithdrawal.create({
        pointId: point.id,
        date: new Date(),
        ...body,
        pointWithdrawalStatusId: 0,
      });

      await PointHistory.create({
        pointId: point.id,
        date: new Date(),
        type: 'debit',
        description: 'Withdrawal',
        amount: body.amount,
        startPoint: Number(point.amount),
        currentPoint: Number(point.amount) - body.amount,
      });

      point.amount = Number(point.amount) - body.amount;
      await point.save();

      return baseResponse.ok(res, { message: 'Withdrawal request has been sent' });
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
