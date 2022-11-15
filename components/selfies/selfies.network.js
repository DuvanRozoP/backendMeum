const express = require('express');
const router = express.Router();
const response = require('../../network/response')
const controller = require('./selfies.controller')

// OBTENCION ESPECIFICA AND ALL
router.get('/', (req,res) => {
    const filterSelfies = req.query.id || null
})

// AGREGAR SELFIES
router.post('/', (req, res) => {

    //console.log(req.body.redes)
    controller.addSelfie(req.body.redes)
    .then( data => response.success(req,res,201,data) )
    .catch( e => response.error(req,res,401,e) )

})

module.exports = router