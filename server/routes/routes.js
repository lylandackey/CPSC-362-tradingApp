import express from 'express';

import { getBacktest } from '../index.js';

const router = express.Router();

router.get('/backtest/:type/:ticker', getBacktest);

const hello = function(req, res, next) {
    let ticker = req.params.ticker;
}
router.get('/hello/:ticker', hello);
// will match any other path
router.use('/', (req, res, next) => {
    res.status(404).json({error : "page not found"});
});

export default router;