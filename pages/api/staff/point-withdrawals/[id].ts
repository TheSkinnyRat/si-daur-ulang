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
  const user = await roleCheck(req.headers['x-jwt-payload'] as string, 'staff', res);
  if (!user) return undefined;
  if (req.method === 'GET') {
    try {
      const pointWithdrawals = await PointWithdrawal.findAll({
        include: [{
          model: Point,
          include: [{
            model: User,
          }],
        }],
        where: {
          id: req.query.id,
        },
      });
      if (!pointWithdrawals.length) return baseResponse.error(res, 400, `Point withdrawal with id ${req.query.id} is not exists`);

      return baseResponse.ok(res, pointWithdrawals);
    } catch (error: any) {
      return baseResponse.error(res, 500, error.message);
    }
  } else if (req.method === 'PATCH') {
    const bodySchema = z.object({
      description: z.string().optional(),
      pointWithdrawalStatusId: z.literal(1).or(z.literal(-1)),
    });

    try {
      if (typeof req.body !== 'object') return baseResponse.error(res, 400, 'Invalid body');
      req.body.pointWithdrawalStatusId = parseInt(req.body.pointWithdrawalStatusId, 10);
      const body = bodySchema.parse(req.body);

      const pointWithdrawal = await PointWithdrawal.findOne({
        include: [{
          model: Point,
        }],
        where: {
          id: req.query.id,
        },
      });
      if (!pointWithdrawal) return baseResponse.error(res, 400, `Point withdrawal with id ${req.query.id} is not exists`);
      if (pointWithdrawal.pointWithdrawalStatusId !== 0) return baseResponse.error(res, 400, `Point withdrawal with id ${req.query.id} is already verified or rejected`);

      pointWithdrawal.set(body);
      await pointWithdrawal.save();

      if (body.pointWithdrawalStatusId === -1) {
        await Point.update({
          amount: Number(pointWithdrawal.point.amount) + Number(pointWithdrawal.amount),
        }, {
          where: {
            id: pointWithdrawal.pointId,
          },
        });
        await PointHistory.create({
          pointId: pointWithdrawal.pointId,
          date: new Date(),
          type: 'credit',
          description: 'Withdrawal rejected',
          amount: Number(pointWithdrawal.amount),
          startPoint: Number(pointWithdrawal.point.amount),
          currentPoint: Number(pointWithdrawal.point.amount) + Number(pointWithdrawal.amount),
        });
      }

      return baseResponse.ok(res, { message: `Point withdrawal with id ${req.query.id} is ${body.pointWithdrawalStatusId === 1 ? 'verified' : 'rejected'}` });
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
