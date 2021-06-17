const axios = require('axios')
const GET = 'get'
const POST = 'post'
const PUT = 'put'
const DELETE = 'delete'

class Http {
    constructor() {}

    post(){}
    put(){}
    delete(){}
    get(url, data){
        return this.request(url, GET, data)
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