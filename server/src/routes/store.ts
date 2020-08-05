import * as express from 'express';

import { getConnectionManager } from 'typeorm';

import { Store } from '../entities/Store';

const router = express.Router();

router.post('', async (req, res) => {
  const { category_seq, address } = req.body;

  const manager = getConnectionManager().get('delivery');
  const repository = manager.getRepository(Store).createQueryBuilder();

  try {
    let re = /([가-힣]+(d{1,5}|)+(시|군|구))( |)([가-힣]+(d{1,5}|)+(동))/g;
    let matched = re.exec(address);

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

router.post('/:seq', async (req, res) => {
  const store_seq = req.params.seq;

  const manager = getConnectionManager().get('delivery');
  const repository = manager.getRepository(Store).createQueryBuilder();

  try {
    const store = await repository.where('seq = :store_seq', { seq: store_seq }).getOne();

    return res.json({ data: store });
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
});

export default router;
