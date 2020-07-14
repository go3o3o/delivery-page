import * as express from 'express';

import { getConnectionManager } from 'typeorm';

import { Store } from '../entities/Store';
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

router.get('/:category', async (req, res) => {
  const category = req.params.category;

  const manager = getConnectionManager().get('delivery');
  const repository = manager.getRepository(Store).createQueryBuilder();

  try {
    const stores = await repository.where('category_seq = :category', { category }).getMany();

    return res.json({ data: stores });
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
});

export default router;
