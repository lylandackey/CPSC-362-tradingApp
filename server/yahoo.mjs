import fetch from 'node-fetch';

export default async function loadResourcesAndDataAsync(req, res, next) {
    try {
        let ticker = req.params.ticker;
        let headers = {
          "Access-Control-Allow-Origin": "*",
          "accepts":"application/json"
        }
        const responseYahoo = await fetch('https://query1.finance.yahoo.com/v7/finance/quote?symbols=' + ticker, {
          headers: headers
        });
        const jsonYahoo = await responseYahoo.json();
        
        res.set('Access-Control-Allow-Origin', '*');
        res.status(200).json( jsonYahoo );
      }
    catch (error) {
        console.error(error);
    }
}
