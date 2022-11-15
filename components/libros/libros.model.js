const mongoose = require('mongoose');

const Schema  = mongoose.Schema;

const modeloSchema = new Schema({
    grupo: String,
    name: String,
    description: String,
    pdf: String,
    png: String,
    date: Date
})

const model = mongoose.model('Libros',modeloSchema);
module.exports = model; 