const express = require('express');
const multer = require('multer');
const router = express.Router();
const response = require('../../network/response')
const controller = require('./libros.controller')

let storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null, './public/file/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname.replace(/\s+/g, ''))
    }
})

let upload = multer({ storage: storage })

// OBTENCION ESPECIFICA Y ALL
router.get('/', (req, res) => {
    const filterLibro = req.query.name || null
    controller.getLibros(filterLibro)
    .then( data => { response.success(req,res,201,data) })
    .catch( error  => { response.error(req,res,401,error) })
})

// CREACION DE LIBROS
router.post('/', 
    upload.fields([
        {name: "pdf", maxCount: 1},
        {name: "png", maxCount: 1},
    ]),
    (req,res) => {
        controller.addLibro(
            req.body.grupo,
            req.body.name,
            req.body.description,
            req.files
        )
        .then( data => { response.success(req,res,201,data) })
        .catch( error => { response.error(req,res,401,error) })
    }
)

// MODIFICACION DE DATOS
router.patch('/:id/:grupo', 
    upload.fields([
        {name: "pdf", maxCount: 1},
        {name: "png", maxCount: 1},
    ]),
    (req,res) => {
        controller.updateLibro(
            req.params.id,
            req.params.grupo,
            req.body.name, 
            req.body.description, 
            req.files
        )
        .then(data => { response.success(req,res,201,data) }).catch( error => { response.error(req,res,401,error) })  
    }
)

// ELIMINACION DE DATOS
router.delete('/:id/:grupo', (req,res) => {
    controller.deleteLibro(
        req.params.id,
        req.params.grupo
    )
    .then(data => { response.success(req,res,201,data) })
    .catch( error => { response.error(req,res,401,error) })
})

module.exports = router