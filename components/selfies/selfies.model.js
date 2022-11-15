const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const modeloSchema = new Schema({
    redes: {
        type: Array,
        default: []
    }
})

const model = mongoose.model('Selfies',modeloSchema);
module.exports = model

