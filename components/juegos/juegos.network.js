const express = require('express');
const multer = require('multer');
const router = express.Router();
const response = require('../../network/response')
const controller = require('./juegos.controller')

let storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null, './public/juegos/')
    },
    filename: function (req,file,cb) {
        cb(null, file.originalname.replace(/\s+/g, ''))
    }
})

let upload = multer({ storage: storage })

// CONSULT JUEGO
router.get('/', (req, res) => {
    const filterJuego = req.query.name || null;
    controller.getJuego(filterJuego)
        .then( data => { response.success(req,res,201,data) })
        .catch( error => { response.error(req,res,401,error) } )
})

// ADD JUEGO
router.post('/',
    upload.fields([
        {name:"png1", maxCount:1},
        {name:"png2", maxCount:1},
        {name:"png3", maxCount:1},
        {name:"png4", maxCount:1},
        {name:"png5", maxCount:1},
    ]),
    (req,res) => {
        controller.addJuego(
            req.body.grupo,
            req.body.name,
            req.body.description,
            req.files
        )
        .then( data => { response.success(req,res,201,data) })
        .catch( error => { response.error(req,res,401,error) })
    }
    
)

// MODIFICAR JEUGOS
router.patch('/:id/:grupo',
    upload.fields([
        {name:"png1", maxCount:1},
        {name:"png2", maxCount:1},
        {name:"png3", maxCount:1},
        {name:"png4", maxCount:1},
        {name:"png5", maxCount:1},
    ]),
    (req,res) => {
        controller.updateJuego(
            req.params.id,
            req.params.grupo,
            req.body.name,
            req.body.description,
            req.files
        )
        .then(data => { response.success(req,res,201,data) })
        .catch(error => { response.error(req,res,401,error) })
    }
)

// DELETE JUEGO
router.delete('/:id/:grupo', (req, res) => {
    controller.deleteJuego(
        req.params.id,
        req.params.grupo)
    .then( data => { response.success(req,res,201,data) })
    .catch( error => { response.error(req,res,401,error) })
})

module.exports = router