const express = require('express');
const libros = require('./components/libros/libros.network')

const router = (server) => {
    server.use('/libros',libros)
    server.use('/uploads', express.static('public'));
}

module.exports = router