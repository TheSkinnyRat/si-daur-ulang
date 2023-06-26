import type { NextApiRequest, NextApiResponse } from 'next';
import baseResponse from '@lib/baseResponse';
import roleCheck from '@/lib/roleCheck';
import dbModels from '@database/mariadb/models';
import { z } from 'zod';

const db: any = dbModels;
const User = db.user;
const Recycle = db.recycle;
const RecycleStatus = db.recycleStatus;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const user = await roleCheck(req.headers['x-jwt-payload'] as string, 'staff', res);
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
        },
      });
      if (!users.length) return baseResponse.error(res, 400, `Recycle with id ${req.query.id} is not exists`);

      return baseResponse.ok(res, users);
    } catch (error: any) {
      return baseResponse.error(res, 500, error.message);
    }
  } else if (req.method === 'PATCH') {
    const bodySchema = z.discriminatedUnion('recycleStatusId', [
      z.object({
        recycleStatusId: z.literal(3),
      }),
      z.object({
        recycleStatusId: z.literal(4),
        actualType: z.string().nonempty(),
        actualWeight: z.number().min(0.1).max(100),
        actualPoint: z.number().min(0),
      }),
    ]);

    try {
      if (typeof req.body !== 'object') return baseResponse.error(res, 400, 'Invalid body');
      req.body.recycleStatusId = parseInt(req.body.recycleStatusId, 10);
      const body = bodySchema.parse(req.body);

      const recycle = await Recycle.findOne({
        where: {
          id: req.query.id,
        },
      });
      if (!recycle) return baseResponse.error(res, 400, `Recycle with id ${req.query.id} is not exists`);
      if (body.recycleStatusId !== 4 && !recycle.selfDelivery) return baseResponse.error(res, 400, `Recycle with id ${req.query.id} is not self delivery`);
      if (recycle.recycleStatusId === 4) return baseResponse.error(res, 400, `Recycle with id ${req.query.id} is already verified`);

      await Recycle.update(body, {
        where: {
          id: req.query.id,
        },
      });

      return baseResponse.ok(res, { message: `Recycle with id ${req.query.id} has been updated successfully` });
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
