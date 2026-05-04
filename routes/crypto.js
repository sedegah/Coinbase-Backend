import { Router } from 'express';
import { getAllCryptos, getGainers, getNewCryptos, createCrypto } from '../controllers/cryptoController.js';

const router = Router();

router.get('/', getAllCryptos);
router.get('/gainers', getGainers);
router.get('/new', getNewCryptos);
router.post('/', createCrypto);

export default router;
