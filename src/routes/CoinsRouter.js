const express = require('express');
const CoinsRouter = express.Router();
const CoinController = require('../controllers/CoinController')
const NO_PARAMS_ERR = 'Please choose coins and date. Make sure date is in the right format: MM/DD/YYYY .'

async function getCoinsPrices(req, res){
    try{
        let params = req.query
        if(!params || !params.coins || !params.date){
            return res.status(400).json(NO_PARAMS_ERR)
        }
        let result = await CoinController.getCoinsPrices(params)
        return res.json(result)
    }catch (e) {
        return res.status(500).json(e.message)
    }
}

CoinsRouter.get('/prices', getCoinsPrices)

module.exports = () => {return CoinsRouter}