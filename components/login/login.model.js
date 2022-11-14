const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const modeloSchema = new Schema({
    user: String,
    password: String,
})

const model = mongoose.model('User',modeloSchema);
module.exports = model;