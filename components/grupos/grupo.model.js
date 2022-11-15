const mongoose = require('mongoose');

const Schema  = mongoose.Schema;

const modeloSchema = new Schema({
    grupo: String,
    integrantes: {
        type: Array,
        default: []
    },
    libros: {
        type: Array,
        default: []
    },
    juegos: {
        type: Array,
        default: []
    },
    selfies: {
        type: Array,
        default: []
    },


})

const model = mongoose.model('Grupos',modeloSchema);
module.exports = model; 