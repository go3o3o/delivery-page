import * as express from 'express';
import * as jwt from 'jwt-simple';

import { getConnectionManager } from 'typeorm';

import { authConf } from '../config';
import { Member } from '../entities/Member';

import logger from '../logger';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const manager = getConnectionManager().get('delivery');
  const repository = manager.getRepository(Member).createQueryBuilder();

  try {
    const user = await repository.where('email = :email', { email }).getOne();

    if (user) {
      const isValidPassword = user.validPassword(password);
      if (isValidPassword) {
        const token = jwt.encode({ seq: user.seq, email: user.email }, authConf.AUTH_KEY);
        return res.json({ data: { token, user }, msg: '로그인 성공!' });
      } else {
        return res.json({ code: 0, msg: '비밀번호가 잘못 되었습니다.' });
      }
    } else {
      return res.json({ code: 0, msg: '해당하는 사용자가 없습니다.' });
    }
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
});

router.post('/signup', async (req, res) => {
  const { email, password, phone_number, nickname } = req.body;

  const manager = getConnectionManager().get('delivery');
  const repository = manager.getRepository(Member).createQueryBuilder();

  try {
    const user = await repository.where('email = :email', { email }).getOne();
    if (user !== undefined) {
      return res.json({ code: 0, msg: '이미 등록된 이메일 입니다.' });
    }

    await repository
      .insert()
      .values({ email, password, phone_number, nickname })
      .execute();

    return res.json({
      code: 1,
      msg: '가입에 성공하였습니다.',
    });
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
});

export default router;
