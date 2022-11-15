const express = require('express');
const libros = require('./components/libros/libros.network');
const user = require('./components/login/login.network');
const juegos = require('./components/juegos/juegos.network')
const selfies = require('./components/selfies/selfies.network');
const grupos = require('./components/grupos/grupo.network');

const router = (server) => {
    server.use('/libros',libros);
    server.use('/user', user);
    server.use('/juegos', juegos);
    server.use('/selfies', selfies);
    server.use('/grupos', grupos)

    server.use('/static', express.static('public'));
}

module.exports = router