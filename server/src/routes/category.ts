import * as express from 'express';

import { getConnectionManager } from 'typeorm';

import { Category } from '../entities/Category';

const router = express.Router();

router.post('', async (req, res) => {
  const manager = getConnectionManager().get('delivery');
  const repository = manager.getRepository(Category).createQueryBuilder();

  try {
    const category = await repository.select().getMany();

    return res.json({ data: category });
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
});

export default router;
