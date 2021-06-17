const express = require('express');
const CoinsRouter = express.Router();
const CoinController = require('../controllers/CoinController')
const NO_PARAMS_ERROR = 'Please choose coins and date.'
const DATE_FORMAT_ERROR = 'Date err. Make sure date is in the right format: MM/DD/YYYY .'

async function getCoinsPrices(req, res){
    try{
        let params = req.query
        if(!params || !params.coins || !params.date){
            return res.status(400).json(NO_PARAMS_ERROR)
        }
        else if(parseInt(params.date.substring(0, 2)) > 12){
            return res.status(400).json(DATE_FORMAT_ERROR)
        }
        let result = await CoinController.getCoinsPrices(params)
        return res.json(result)
    }catch (e) {
        return res.status(500).json(e.message)
    }
}

CoinsRouter.get('/prices', getCoinsPrices)

module.exports = () => {return CoinsRouter}