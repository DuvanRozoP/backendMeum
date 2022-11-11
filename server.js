const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

// CONFIGURATION OF SERVER CONECTION
const uri = require('./config.server')
const db = require('./db')
db(uri)
// --

const router = require('./routers');

let app = express();
const port =  process.env.PORT || 3000;

// WHILE LIST
const whitelist = [
    'http://127.0.0.1:5500',
    'https://mighty-tor-31120.herokuapp.com',
    'http://localhost:3000',
]

//app.use(cors())
app.use(cors({
    origin: whitelist
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

router(app);

app.listen(port, () => {
    console.log('corriendo en puerto:', port)
});
