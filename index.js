const express = require('express')
const bodyParser = require('body-parser');

const PORT = process.env.PORT

const api = new express()
api.use(bodyParser.json({limit: '50mb'}));
api.use(bodyParser.urlencoded({extended: false}));

api.listen(PORT, () => {
    console.log("api is up")
});

api.get('/', (req, res) => {
    res.send(require('./src/greeting'));
});

api.use('/coins', require('./src/routes/CoinsRouter')());