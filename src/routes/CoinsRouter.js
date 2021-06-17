const express = require('express');
const CoinsRouter = express.Router();
const CoinController = require('../controllers/CoinController')
const NO_COINS_ERR = 'Please choose at lease one coin'

function getCoinsPrices(req, res){
    try{
        let params = req.query
        if(!params || !params.coins){
            return res.status(400).json(NO_COINS_ERR)
        }
        CoinController.getCoinsPrices(params).then(result => {
            return res.json(result)
        })
    }catch (e) {
        return res.status(500).json(e.message)
    }
}

CoinsRouter.get('/prices', getCoinsPrices)

module.exports = () => {return CoinsRouter}