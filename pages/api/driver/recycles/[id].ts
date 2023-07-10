import type { NextApiRequest, NextApiResponse } from 'next';
import baseResponse from '@lib/baseResponse';
import roleCheck from '@/lib/roleCheck';
import dbModels from '@database/mariadb/models';
import { z } from 'zod';

const db: any = dbModels;
const Recycle = db.recycle;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const user = await roleCheck(res.getHeader('x-jwt-payload') as string, 'driver', res);
  if (!user) return undefined;
  if (req.method === 'PATCH') {
    const bodySchema = z.object({
      recycleStatusId: z.number().min(0).max(3),
      driverId: z.number().min(1).optional(),
    });

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
      if (recycle.selfDelivery) return baseResponse.error(res, 400, `Recycle with id ${req.query.id} is self delivery`);
      if (recycle.recycleStatusId < 0 || recycle.recycleStatusId > 2) return baseResponse.error(res, 400, `Recycle with id ${req.query.id} cannot be updated`);
      if (recycle.recycleStatusId >= 1 && recycle.recycleStatusId <= 2) {
        if (recycle.driverId !== user.id) return baseResponse.error(res, 400, `Recycle with id ${req.query.id} is already assigned to another driver`);
      }
      if (
        (recycle.recycleStatusId + 1 !== body.recycleStatusId)
        && (recycle.recycleStatusId - 1 !== body.recycleStatusId)
      ) return baseResponse.error(res, 400, `'RecycleStatusId' must be one step ahead or behind. Current 'RecycleStatusId' is ${recycle.recycleStatusId}. 'RecycleStatusId' in body is ${body.recycleStatusId}.`);

      body.driverId = user.id;
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
