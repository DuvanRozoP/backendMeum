const user = 'duvanAdmin'
const password = 'mluY4orY1BaB7z2e'
const uri = `mongodb+srv://${user}:${password}@cluster0.bvxrtoj.mongodb.net/?retryWrites=true&w=majority`

const config = {
    url: uri,
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'https://richardardilaayala.herokuapp.com',
    publicRoute: process.env.PUBLIC_ROUTE || '/static'
}
//https://richardardilaayala.herokuapp.com/libros
module.exports = config