// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import baseResponse from '@lib/baseResponse';
import dbModels from '@database/mariadb/models';

const db: any = dbModels;
const User = db.user;
const UserRole = db.userRole;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const user = await User.findOne({
      where: {
        idCard: '0000000000000000',
      },
      include: UserRole,
    });

    if (!user) {
      return baseResponse.error(res, 404, 'User not found');
    }

    return baseResponse.ok(res, user);
  } catch (error: any) {
    baseResponse.error(res, 500, error.message);
  }
  return undefined;
  // res.status(200).json({ name: 'John Doe' });
}
