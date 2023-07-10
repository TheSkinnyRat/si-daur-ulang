import type { NextApiRequest, NextApiResponse } from 'next';
import baseResponse from '@lib/baseResponse';
import roleCheck from '@/lib/roleCheck';
import dbModels from '@database/mariadb/models';
import { Op } from 'sequelize';

const db: any = dbModels;
const User = db.user;
const Recycle = db.recycle;
const RecycleStatus = db.recycleStatus;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const user = await roleCheck(res.getHeader('x-jwt-payload') as string, 'staff', res);
  if (!user) return undefined;
  if (req.method === 'GET') {
    try {
      const users = await Recycle.findAll({
        include: [{
          model: RecycleStatus,
        }, {
          model: User,
          as: 'user',
          attributes: { exclude: ['password'] },
        }],
        where: {
          recycleStatusId: {
            [Op.eq]: 0,
          },
          selfDelivery: {
            [Op.eq]: 1,
          },
        },
      });

      return baseResponse.ok(res, users);
    } catch (error: any) {
      return baseResponse.error(res, 500, error.message);
    }
  }
  return baseResponse.error(res, 405, 'Method not allowed');
}
