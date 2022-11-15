const express = require('express');
const router = express.Router();
const response = require('../../network/response')
const controller = require('./selfies.controller')

// OBTENCION ESPECIFICA AND ALL
router.get('/', (req,res) => {
    const filterSelfies = req.query.id || null;
    controller.getSelfies(filterSelfies)
    .then( data => { response.success(req,res,201,data) })
    .catch( error  => { response.error(req,res,401,error) })
})

// AGREGAR SELFIES
router.post('/', (req, res) => {
    controller.addSelfie(
        req.body.grupo,
        req.body.redes,
    )
    .then( data => response.success(req,res,201,data) )
    .catch( e => response.error(req,res,401,e) )
})

// ACTULIZAR SELFIE
router.patch('/:id/:grupo', (req, res) => {
    controller.updateSelfies(
        req.params.id,
        req.params.grupo,
        req.body.redes
    )
    .then(data => { response.success(req,res,201,data) })
    .catch( error => { response.error(req,res,401,error) })
})
 
// ELIMINAR SELFIE
router.delete('/:id/:grupo', (req,res) => {
    controller.deleteSelfies(
        req.params.id,
        req.params.grupo,
    )
    .then(data => response.success(req,res,201,data))
    .catch(error => response.error(req,res,401,error));
})

module.exports = router