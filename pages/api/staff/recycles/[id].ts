import type { NextApiRequest, NextApiResponse } from 'next';
import baseResponse from '@lib/baseResponse';
import roleCheck from '@/lib/roleCheck';
import dbModels from '@database/mariadb/models';
import { z } from 'zod';

const db: any = dbModels;
const User = db.user;
const Recycle = db.recycle;
const RecycleStatus = db.recycleStatus;
const Point = db.point;
const PointHistory = db.pointHistory;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const user = await roleCheck(res.getHeader('x-jwt-payload') as string || req.headers['x-jwt-payload'] as string, 'staff', res);
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
        actualType: z.enum(['kertas', 'plastik', 'kaca', 'kaleng']),
        actualWeight: z.number().min(0.1).max(100),
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

      if (body.recycleStatusId === 4) {
        let actualPoint = 0;
        if (body.actualType === 'kertas') actualPoint = body.actualWeight * 500;
        else if (body.actualType === 'plastik') actualPoint = body.actualWeight * 750;
        else if (body.actualType === 'kaca') actualPoint = body.actualWeight * 800;
        else if (body.actualType === 'kaleng') actualPoint = body.actualWeight * 600;
        await Recycle.update({
          actualPoint,
        }, {
          where: {
            id: req.query.id,
          },
        });

        const point = await Point.findOne({
          where: {
            userId: recycle.userId,
          },
        });
        if (!point) {
          const createdPoint = await Point.create({
            userId: recycle.userId,
            amount: actualPoint,
          });
          await PointHistory.create({
            pointId: createdPoint.id,
            recycleId: recycle.id,
            date: new Date(),
            type: 'credit',
            description: 'Recycle verified',
            amount: actualPoint,
            startPoint: 0,
            currentPoint: actualPoint,
          });
        } else {
          point.amount = Number(point.amount);
          await Point.update({
            amount: point.amount + actualPoint,
          }, {
            where: {
              userId: recycle.userId,
            },
          });
          await PointHistory.create({
            pointId: point.id,
            recycleId: recycle.id,
            date: new Date(),
            type: 'credit',
            description: 'Recycle verified',
            amount: actualPoint,
            startPoint: point.amount,
            currentPoint: point.amount + actualPoint,
          });
        }
      }

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
