const db = require('mongoose');

//key api = ygnnZBc0mFOQ4aEA0hZTHU6FaRpklP2EFwO3lN72XXagZM6HoRjcfEfSqBHntBVZ


db.Promise = global.Promise
async function conexion(uri) {
 
    await db.connect(uri, { 
        useNewUrlParser: true
    })
    console.log('connect in mongodb');
}


module.exports = conexion;