import type { NextApiRequest, NextApiResponse } from 'next';
import baseResponse from '@lib/baseResponse';
import roleCheck from '@/lib/roleCheck';
import dbModels from '@database/mariadb/models';

const db: any = dbModels;
const User = db.user;
const Point = db.point;
const PointHistory = db.pointHistory;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const user = await roleCheck(res.getHeader('x-jwt-payload') as string || req.headers['x-jwt-payload'] as string, 'user', res);
  if (!user) return undefined;
  if (req.method === 'GET') {
    try {
      const point = await PointHistory.findAll({
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

      return baseResponse.ok(res, point);
    } catch (error: any) {
      return baseResponse.error(res, 500, error.message);
    }
  }
  return baseResponse.error(res, 405, 'Method not allowed');
}
