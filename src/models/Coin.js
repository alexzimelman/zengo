const { Rational } = require('rational-arithmetic');
const http = require('./Http')

class Coin {
    constructor() {
        this.apiKey = process.env.API_KEY
        this.baseUrl = process.env.BASE_URL
        this.todayBaseUrl = this.baseUrl + `pricemulti?api_key=${this.apiKey}limit=1&tsyms=USD`
        this.pastBaseUrl = this.baseUrl + `pricehistorical?api_key=${this.apiKey}limit=1&tsyms=USD`

        this.defaultCurrency = 'USD'
    }

    calcPercentage(startingVal, newVal){
        return parseInt(((new Rational(newVal) - new Rational(startingVal)) /new Rational(startingVal)) * 100)
    }

    async getPrice(params){
        let coins = params.coins.split(',')
        let promises = [http.get(this.todayBaseUrl + `&fsyms=${params.coins}`, null)]
        coins.forEach(coin => {
            promises.push(http.get(this.pastBaseUrl + `&fsym=${coin}` + `&ts=${new Date(params.date).getTime()/1000}`, null))
        })
        let prices = await Promise.all(promises)
        return this.setPrices(coins, prices)
    }

    setPrices(coins, prices){
        try{
            let todayPrices = prices[0].data
            let pastPrices = {}
            prices.forEach((price, index) => {
                if(index > 0){
                    Object.assign(pastPrices, price.data)
                }
            })
            let difference = coins.map( coin => {
                let value = this.calcPercentage(pastPrices[coin][this.defaultCurrency], todayPrices[coin][this.defaultCurrency])
                return {value, label: coin + ':' + value + '%'}
            })
            return difference.sort((a, b) => b.value - a.value).map(coin => coin.label)
        }catch(e){
            return e
        }
    }
}

module.exports = Coin