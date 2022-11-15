const storeSelfies = require('./selfies.store')

// ADD SELFIES CAMPS AND VERFICED
function addSelfie(array) {
    return new Promise((resolve, reject) => {
        if(array.length === 0) return reject('Ingrese los datos necesarios')

        const data = {
            redes: array
        }

        resolve(data)
    })
}

module.exports = {
    addSelfie
}