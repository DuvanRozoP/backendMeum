const express = require('express');
const libros = require('./components/libros/libros.network');
const user = require('./components/login/login.network');
const juegos = require('./components/juegos/juegos.network')

const router = (server) => {
    server.use('/libros',libros);
    server.use('/user', user);
    server.use('/juegos', juegos);
    server.use('/static', express.static('public'));
}

module.exports = router