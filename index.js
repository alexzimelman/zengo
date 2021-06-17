const express = require('express')
const bodyParser = require('body-parser');

const PORT = 8080

const api = new express()
api.use(bodyParser.json({limit: '50mb'}));
api.use(bodyParser.urlencoded({extended: false}));

api.listen(PORT, () => {
    console.log("api is up")
});

api.use('/coins', require('./src/routes/CoinsRouter')());