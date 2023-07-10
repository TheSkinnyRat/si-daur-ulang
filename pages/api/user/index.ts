// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import baseResponse from '@lib/baseResponse';
import roleCheck from '@/lib/roleCheck';
// import dbModels from '@database/mariadb/models';

// const db: any = dbModels;
// const User = db.user;
// const UserRole = db.userRole;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const user = await roleCheck(res.getHeader('x-jwt-payload') as string, 'user', res);
    if (!user) return undefined;

    return baseResponse.ok(res, user);
  } catch (error: any) {
    baseResponse.error(res, 500, error.message);
  }
  return undefined;
  // res.status(200).json({ name: 'John Doe' });
}
