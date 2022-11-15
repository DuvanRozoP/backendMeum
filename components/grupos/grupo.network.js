const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./grupo.controller');

//  OBTENER GRUPO
router.get('/', (req, res) => {
    const filterGrupo = req.query.id || null;
    controller.getGrupo(filterGrupo)
    .then( data => { response.success(req,res,201,data) })
    .catch( e => { response.error(req,res,401,e) })
})

// CREAR GRUPO
router.post('/',(req, res) => {
    controller.addGrupo(
        req.body.grupo,
        req.body.integrantes,
        req.body.libros,
        req.body.juegos,
        req.body.selfies
    )
    .then( data => { response.success(req,res,201,data) })
    .catch( e => { response.error(req,res,401,e) })
})

// ACTUALIZAR DATOS DE LOS GRUPOS
router.patch('/:id', (req,res) => {
    controller.updateGrupo(
        req.params.id,
        req.body.integrantes,
        req.body.libros,
        req.body.juegos,
        req.body.selfies
    )
    .then( data => { response.success(req,res,201,data) })
    .catch( e => { response.error(req,res,401,e) })
})

module.exports = router