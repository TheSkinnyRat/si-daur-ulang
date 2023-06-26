import type { NextApiRequest, NextApiResponse } from 'next';
import baseResponse from '@lib/baseResponse';
import roleCheck from '@/lib/roleCheck';
import dbModels from '@database/mariadb/models';

const db: any = dbModels;
const User = db.user;
const Recycle = db.recycle;
const RecycleStatus = db.recycleStatus;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const user = await roleCheck(req.headers['x-jwt-payload'] as string, 'user', res);
  if (!user) return undefined;
  if (req.method === 'GET') {
    try {
      const users = await Recycle.findAll({
        include: [{
          model: RecycleStatus,
        }, {
          model: User,
          as: 'driver',
          attributes: { exclude: ['password'] },
        }],
        where: {
          id: req.query.id,
          userId: user.id,
        },
      });
      if (!users.length) return baseResponse.error(res, 400, `Recycle with id ${req.query.id} is not exists`);

      return baseResponse.ok(res, users);
    } catch (error: any) {
      return baseResponse.error(res, 500, error.message);
    }
  } else if (req.method === 'DELETE') {
    try {
      const recycle = await Recycle.findOne({
        where: {
          id: req.query.id,
          userId: user.id,
        },
      });
      if (!recycle) return baseResponse.error(res, 400, `Recycle with id ${req.query.id} is not exists`);
      if (recycle.recycleStatusId !== 0) return baseResponse.error(res, 400, `Recycle with id ${req.query.id} cannot be deleted`);

      await Recycle.destroy({
        where: {
          id: req.query.id,
          userId: user.id,
        },
      });

      return baseResponse.ok(res, { message: `Recycle with id ${req.query.id} has been deleted successfully` });
    } catch (error: any) {
      return baseResponse.error(res, 500, error.message);
    }
  }
  return baseResponse.error(res, 405, 'Method not allowed');
}
