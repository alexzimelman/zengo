const Coin = require('../models/Coin')

class RobotService {
    constructor() {
        this.coin = new Coin()
    }

    async getCoinsPrices(params){
        return await this.coin.getPrice(params)
    }
}
module.exports = new RobotService();