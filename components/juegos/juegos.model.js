const mongoose = require('mongoose');

const Schema  = mongoose.Schema;

const modeloSchema = new Schema({
    grupo: String,
    name: String,
    description: String,
    png1: String,
    png2: String,
    png3: String,
    png4: String,
    png5: String,
})

const model = mongoose.model('Juegos',modeloSchema);
module.exports = model; 