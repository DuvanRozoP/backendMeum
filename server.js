const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

// CONFIGURATION OF SERVER CONECTION
const config = require('./config.server')
const db = require('./db')
db(config.url)
// --

const router = require('./routers');

let app = express();

// WHILE LIST
const whitelist = [
    'http://127.0.0.1:5500',
    'https://mighty-tor-31120.herokuapp.com',
    'http://localhost:3000',
]

app.use(cors({ origin: whitelist }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

router(app);

app.listen(config.port, () => { console.log('corriendo en: '+ config.host + config.port) });