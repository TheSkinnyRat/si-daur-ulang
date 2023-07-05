import type { NextApiRequest, NextApiResponse } from 'next';
import baseResponse from '@lib/baseResponse';
import roleCheck from '@/lib/roleCheck';
import dbModels from '@database/mariadb/models';

const db: any = dbModels;
const User = db.user;
const Chat = db.chat;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const user = await roleCheck(req.headers['x-jwt-payload'] as string, 'user', res);
  if (!user) return undefined;
  if (req.method === 'GET') {
    try {
      const chats = await Chat.findOne({
        include: [{
          model: User,
          attributes: { exclude: ['password'] },
        }],
        where: {
          id: req.query.id,
          userId: user.id,
        },
      });

      const chatsChildren = await Chat.findOne({
        where: {
          parentId: req.query.id,
          userId: user.id,
        },
      });

      return baseResponse.ok(res, [{
        ...chats.toJSON(),
        children: chatsChildren,
      }]);
    } catch (error: any) {
      return baseResponse.error(res, 500, error.message);
    }
  }
  return baseResponse.error(res, 405, 'Method not allowed');
}
