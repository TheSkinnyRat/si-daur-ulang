import type { NextApiRequest, NextApiResponse } from 'next';
import baseResponse from '@lib/baseResponse';
import roleCheck from '@/lib/roleCheck';
import dbModels from '@database/mariadb/models';
import { openai } from '@/lib/api';
import { z } from 'zod';

const db: any = dbModels;
const User = db.user;
const Chat = db.chat;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const user = await roleCheck(res.getHeader('x-jwt-payload') as string || req.headers['x-jwt-payload'] as string, 'user', res);
  if (!user) return undefined;
  if (req.method === 'GET') {
    try {
      const chats = await Chat.findAll({
        include: [{
          model: User,
          attributes: { exclude: ['password'] },
        }],
        where: {
          userId: user.id,
          parentId: null,
        },
      });

      return baseResponse.ok(res, chats);
    } catch (error: any) {
      return baseResponse.error(res, 500, error.message);
    }
  } else if (req.method === 'POST') {
    const bodySchema = z.object({
      question: z.string().max(300).nonempty(),
    });

    try {
      if (typeof req.body !== 'object') return baseResponse.error(res, 400, 'Invalid body');
      const body = bodySchema.parse(req.body);

      const chatCompletion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        temperature: 0,
        messages: [{
          role: 'system', content: 'Kamu adalah asisten yang akan diberikan pertanyaan terkait sampah rumah tangga, tugasmu adalah untuk memberikan jawaban apakah sampah tersebut dapat di daur ulang atau tidak.\n\nBerikut ini beberapa kategori sampah yang dapat di daur ulang di tempat kami:\n1. kertas\n2. plastik\n3. kaca\n4. kaleng\n\n- Jawablah dengan format seperti ini:\n[jenis sampah yang ditanyakan] -> kategori: [jenis kategori sampah yang bisa di daur ulang di tempat kami, jika tidak ada maka berikan penjelasan tidak bisa di tempat kami].\n\n- lanjutkan dengan baris paragraf baru:\n "Ya, sampah [jenis sampah yang ditanyakan] dapat di daur ulang" atau "Tidak, sampah [jenis sampah yang ditanyakan] tidak dapat di daur ulang". Lalu setelahnya kamu dapat memberikan sedikit penjelasan yang sangat singkat.\n\n- Jawablah hanya dengan plain text dan tidak menggunakan markdown atau format tertentu.',
        }, {
          role: 'user', content: body.question,
        }],
      });

      const chatQuestion = await Chat.create({
        userId: user.id,
        type: 'question',
        chat: body.question,
      });

      await Chat.create({
        userId: user.id,
        type: 'answer',
        chat: chatCompletion.data.choices[0].message?.content,
        parentId: chatQuestion.id,
      });

      return baseResponse.ok(res, {
        question: body.question,
        answer: chatCompletion.data.choices[0].message?.content,
        tokenUsage: chatCompletion.data.usage,
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
