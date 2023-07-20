import type { NextApiRequest, NextApiResponse } from 'next';
import baseResponse from '@lib/baseResponse';
import roleCheck from '@/lib/roleCheck';
import dbModels from '@database/mariadb/models';
import { Op } from 'sequelize';

const db: any = dbModels;
const User = db.user;
const Point = db.point;
const PointWithdrawal = db.pointWithdrawal;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const user = await roleCheck(res.getHeader('x-jwt-payload') as string || req.headers['x-jwt-payload'] as string, 'staff', res);
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
          pointWithdrawalStatusId: {
            [Op.ne]: 0,
          },
        },
      });

      return baseResponse.ok(res, pointWithdrawals);
    } catch (error: any) {
      return baseResponse.error(res, 500, error.message);
    }
  }
  return baseResponse.error(res, 405, 'Method not allowed');
}
