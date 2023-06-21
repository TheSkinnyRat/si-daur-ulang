import type { NextApiResponse } from 'next';
import baseResponse from '@lib/baseResponse';
import dbModels from '@database/mariadb/models';

const db: any = dbModels;
const User = db.user;
const UserRole = db.userRole;

interface IJwtPayload {
  id: number;
  iat: number;
  exp: number;
}

export default async function roleCheck(
  jwtPayloadHeader: string,
  role: 'admin' | 'staff' | 'driver' | 'user' | 'all',
  res: NextApiResponse,
): Promise<IJwtPayload | false> {
  const jwtPayload: IJwtPayload = JSON.parse(jwtPayloadHeader);
  const user = await User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: jwtPayload.id,
    },
    include: UserRole,
  });

  if (!user) {
    baseResponse.error(res, 404, 'User not found');
    return false;
  }
  if (!user.userRole) {
    baseResponse.error(res, 404, 'User role not found');
    return false;
  }
  if (role === 'all') return user;
  if (user.userRole.name === role) return user;

  baseResponse.error(res, 401, `Unauthorized!. Require ${role} role.`);
  return false;
}
