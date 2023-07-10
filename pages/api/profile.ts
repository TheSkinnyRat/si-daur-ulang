import type { NextApiRequest, NextApiResponse } from 'next';
import baseResponse from '@lib/baseResponse';
import roleCheck from '@/lib/roleCheck';
import dbModels from '@database/mariadb/models';
import hashPassword from '@/lib/hashPassword';
import { z } from 'zod';
import { Op } from 'sequelize';

const db: any = dbModels;
const User = db.user;
const UserRole = db.userRole;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const user = await roleCheck(res.getHeader('x-jwt-payload') as string, 'all', res);
  if (!user) return undefined;
  if (req.method === 'GET') {
    try {
      const userProfile = await User.findOne({
        where: {
          id: user.id,
        },
        attributes: { exclude: ['password'] },
        include: UserRole,
      });
      if (!userProfile) return baseResponse.error(res, 400, `User with id ${user.id} is not exists`);

      return baseResponse.ok(res, userProfile);
    } catch (error: any) {
      return baseResponse.error(res, 500, error.message);
    }
  } else if (req.method === 'PATCH') {
    const bodySchema = z.object({
      idCard: z.string().length(16).nonempty().optional(),
      email: z.string().email().nonempty().optional(),
      phone: z.string().min(4).nonempty().optional(),
      name: z.string().nonempty().optional(),
      address: z.string().nonempty().optional(),
      password: z.string().nonempty().optional(),
      rePassword: z.string().nonempty().optional(),
    });

    try {
      if (typeof req.body !== 'object') return baseResponse.error(res, 400, 'Invalid body');
      if (req.body.userRoleId) req.body.userRoleId = parseInt(req.body.userRoleId, 10);
      const body = bodySchema.parse(req.body);

      if (body.password !== body.rePassword) {
        return baseResponse.error(res, 400, 'Password and Retyped Password does\'t match');
      }
      const userCheckExists = await User.findOne({
        where: {
          id: user.id,
        },
      });
      if (!userCheckExists) return baseResponse.error(res, 400, `User with id ${user.id} is not exists`);
      if (body.email) {
        const userCheckEmail = await User.findOne({
          where: {
            [Op.and]: [
              { email: body.email },
              { id: { [Op.ne]: user.id } },
            ],
          },
        });
        if (userCheckEmail) return baseResponse.error(res, 400, 'Email already exists');
      }
      if (body.idCard) {
        const userCheckIdCard = await User.findOne({
          where: {
            [Op.and]: [
              { idCard: body.idCard },
              { id: { [Op.ne]: user.id } },
            ],
          },
        });
        if (userCheckIdCard) return baseResponse.error(res, 400, 'Id Card (KTP) already exists');
      }

      if (body.password) body.password = hashPassword(body.password);
      await User.update(body, {
        where: {
          id: user.id,
        },
      });

      return baseResponse.ok(res, { message: `User with id ${user.id} has been updated successfully` });
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
