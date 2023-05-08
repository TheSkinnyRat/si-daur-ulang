// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import dbModels from '../../databases/mariadb/models';

const db: any = dbModels;
const User = db.user;
const UserRole = db.userRole;

type Data = {
  user?: object,
  error?: string
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    const user = await User.findOne({
      where: {
        idCard: '0000000000000000',
      },
      include: UserRole,
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
  return undefined;
  // res.status(200).json({ name: 'John Doe' });
}
