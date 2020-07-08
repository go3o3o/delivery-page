import * as express from 'express';
import * as jwt from 'jwt-simple';

import { authConf } from '../config';
import { Member } from '../entities/Member';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await Member.findOne({ where: { email } });

  if (user) {
    const isValidPassword = user.validPassword(password);
    if (isValidPassword) {
      const token = jwt.encode({ seq: user.seq, email: user.email }, authConf.AUTH_KEY);
      res.json({ data: { token, user }, msg: '로그인 성공!' });
    } else {
      return res.status(400).json({ msg: '비밀번호가 잘 못 되었습니다.' });
    }
  } else {
    return res.status(404).json({ msg: '해당하는 사용자가 없습니다.' });
  }
});

router.post('/signup', async (req, res) => {
  const { email, password, phone_number, nickname } = req.body;

  const user = await Member.findOne({
    where: { email },
  });

  if (user) {
    return res.status(400).json({ msg: '이미 등록된 이메일 입니다.' });
  }

  const createdUser = await Member.create({ email, password, phone_number, nickname });

  return res.json({
    data: { seq: createdUser.seq },
    msg: '가입에 성공하였습니다.',
  });
});

export default router;
