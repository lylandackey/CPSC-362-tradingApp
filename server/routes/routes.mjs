import express from 'express';

import { getBacktest } from '../index.mjs';
import getYahoo from '../yahoo.mjs';

const router = express.Router();

router.get('/backtest/:type/:ticker', getBacktest);

router.get('/yahoo/:ticker', getYahoo);

// will match any other path
router.use('/', (req, res, next) => {
    res.status(404).json({error : "page not found"});
});

export default router;