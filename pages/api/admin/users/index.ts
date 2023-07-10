import type { NextApiRequest, NextApiResponse } from 'next';
import baseResponse from '@lib/baseResponse';
import roleCheck from '@/lib/roleCheck';
import dbModels from '@database/mariadb/models';
import { z } from 'zod';
import hashPassword from '@/lib/hashPassword';

const db: any = dbModels;
const User = db.user;
const UserRole = db.userRole;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!await roleCheck(res.getHeader('x-jwt-payload') as string, 'admin', res)) return undefined;
  if (req.method === 'GET') {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['password'] },
        include: UserRole,
      });

      return baseResponse.ok(res, users);
    } catch (error: any) {
      return baseResponse.error(res, 500, error.message);
    }
  } else if (req.method === 'POST') {
    const bodySchema = z.object({
      idCard: z.string().length(16).nonempty(),
      email: z.string().email().nonempty(),
      phone: z.string().min(4).nonempty(),
      name: z.string().nonempty(),
      address: z.string().nonempty(),
      password: z.string().nonempty(),
      userRoleId: z.number().min(0).max(3),
    });

    try {
      if (typeof req.body !== 'object') return baseResponse.error(res, 400, 'Invalid body');
      req.body.userRoleId = parseInt(req.body.userRoleId, 10);
      const body = bodySchema.parse(req.body);

      const userCheckEmail = await User.findOne({
        where: {
          email: body.email,
        },
      });
      if (userCheckEmail) return baseResponse.error(res, 400, 'Email already exists');
      const userCheckIdCard = await User.findOne({
        where: {
          idCard: body.idCard,
        },
      });
      if (userCheckIdCard) return baseResponse.error(res, 400, 'Id Card (KTP) already exists');

      body.password = hashPassword(body.password);
      await User.create(body);

      return baseResponse.ok(res, { message: 'User created successfully' });
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
