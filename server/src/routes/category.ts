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

router.post('', async (req, res) => {
  const { category_seq, address } = req.body;

  const manager = getConnectionManager().get('delivery');
  const repository = manager.getRepository(Store).createQueryBuilder();

  try {
    let re = /([가-힣]+(d{1,5}|)+(시|군|구))( |)([가-힣]+(d{1,5}|)+(동))/g;
    let matched = re.exec(address);
    console.log(matched[0]);

    const stores = await repository
      .where('store_location LIKE :address', {
        address: '%' + matched[0] + '%',
      })
      .andWhere('category_seq = :category_seq', { category_seq })
      .getMany();

    // console.log(stores);
    return res.json({ data: stores });
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
});

export default router;
