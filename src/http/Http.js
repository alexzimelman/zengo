const axios = require('axios')
const GET = 'get'
const POST = 'post'
const PUT = 'put'
const DELETE = 'delete'

class Http {
    constructor() {}

    post(url, data){
        return this.request(url, PUT, data)
    }
    put(url, data){
        return this.request(url, PUT, data)
    }
    delete(url){
        return this.request(url, DELETE)
    }
    get(url){
        return this.request(url, GET)
    }

    request(url, method, data) {
        try{
            let config = {method, url}
            if(data){
                config.data = data
            }
            return axios(config).catch(err => {throw new Error(err)})
        }catch (e) {
            return e
        }
    }
}

module.exports = new Http()