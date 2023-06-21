import type { NextApiRequest, NextApiResponse } from 'next';
import baseResponse from '@lib/baseResponse';
import dbModels from '@database/mariadb/models';
import bcrypt from 'bcrypt';
import * as jose from 'jose';
import { z } from 'zod';

const db: any = dbModels;
const User = db.user;
const UserRole = db.userRole;

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    email: string;
    password: string;
  }
}

const bodySchema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().nonempty(),
});

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      if (typeof req.body !== 'object') return baseResponse.error(res, 400, 'Invalid body');
      const body = bodySchema.parse(req.body);
      const user = await User.findOne({
        where: {
          email: body.email,
        },
        include: {
          model: UserRole,
          attributes: ['id', 'name'],
        },
      });
      if (!user) {
        return baseResponse.error(res, 404, 'User not found.');
      }

      const passwordIsValid = bcrypt.compareSync(body.password, user.password);
      if (!passwordIsValid) {
        return baseResponse.error(res, 401, 'Invalid Password!');
      }

      const unixDateNow = Math.floor(Date.now() / 1000);
      const accessToken = await new jose.SignJWT({ id: user.id })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setIssuedAt(unixDateNow)
        .setExpirationTime(unixDateNow + parseInt(process.env.APP_SESSION_TIME, 10))
        .sign(new TextEncoder().encode(process.env.APP_KEY));

      return baseResponse.ok(res, {
        accessToken,
        user: {
          id: user.id,
          name: user.name,
          userRole: user.userRole,
        },
      });
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
