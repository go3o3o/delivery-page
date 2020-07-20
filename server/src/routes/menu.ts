import * as express from 'express';

import { Menu } from '../entities/Menu';
import { getConnectionManager } from 'typeorm';

const router = express.Router();

router.post('/:store_seq', async (req, res) => {
  const store_seq = req.params.store_seq;

  const manager = getConnectionManager().get('delivery');
  const repository = manager.getRepository(Menu).createQueryBuilder();
  try {
    const menu = await repository.where('store_seq = :store_seq', { store_seq }).getMany();

    return res.json({ data: menu });
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
});

export default router;
