import * as express from 'express';
import { Store } from '../entities/Store';

const router = express.Router();

router.get('/:category', async (req, res) => {
  const category = req.params.category;
  try {
    const stores = await Store.find({
      where: { category }
    });
    return res.json({ data: stores });
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
});

export default router;
