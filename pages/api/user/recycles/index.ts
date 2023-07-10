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
  const user = await roleCheck(res.getHeader('x-jwt-payload') as string, 'user', res);
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
          userId: user.id,
        },
      });

      return baseResponse.ok(res, users);
    } catch (error: any) {
      return baseResponse.error(res, 500, error.message);
    }
  } else if (req.method === 'POST') {
    const bodySchema = z.object({
      userId: z.number().min(0).optional(),
      type: z.string().nonempty(),
      weight: z.number().min(0.1).max(10),
      selfDelivery: z.number().min(0).max(1),
      recycleStatusId: z.number().min(0).optional(),
    });

    try {
      if (typeof req.body !== 'object') return baseResponse.error(res, 400, 'Invalid body');
      req.body.weight = Number(req.body.weight);
      req.body.selfDelivery = Number(req.body.selfDelivery);
      const body = bodySchema.parse(req.body);

      body.userId = user.id;
      body.recycleStatusId = 0;
      await Recycle.create(body);

      return baseResponse.ok(res, { message: 'New recycle request created successfully' });
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
