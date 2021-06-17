const Coin = require('../models/Coin')

class CoinService {
    constructor() {
        this.coin = new Coin()
    }

    async getCoinsPrices(params){
        return await this.coin.getPrice(params)
    }
}
module.exports = new CoinService();