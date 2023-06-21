import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import baseResponse from '@lib/baseResponse';
import dbModels from '@database/mariadb/models';
import hashPassword from '@/lib/hashPassword';

const db: any = dbModels;
const User = db.user;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const bodySchema = z.object({
      idCard: z.string().length(16).nonempty(),
      email: z.string().email().nonempty(),
      phone: z.string().min(4).nonempty(),
      name: z.string().nonempty(),
      address: z.string().nonempty(),
      password: z.string().nonempty(),
      rePassword: z.string().nonempty(),
      userRoleId: z.number().min(0).max(3).optional(),
    });

    try {
      if (typeof req.body !== 'object') return baseResponse.error(res, 400, 'Invalid body');
      const body = bodySchema.parse(req.body);

      if (body.password !== body.rePassword) {
        return baseResponse.error(res, 400, 'Password and Retyped Password does\'t match');
      }
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
      body.userRoleId = 3;
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
