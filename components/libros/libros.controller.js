const storeLibros = require('./libros.store');
const editFile = require('../../file');
const config = require('../../config.server');

// ADD LIBRO CONTROLLER CAMPOS AND TYPE
function addLibro(name,description,file) {
    return new Promise((resolve,reject) => {

        if(!name || !description){
            reject('nombre y description no son validos')
            return false
        }
        if(!file.pdf[0].mimetype){
            reject('debes enviar un archivo pdf')
            return false
        }
        if(!file.png[0].mimetype){
            reject('debes enviar un archivo jpeg')
            return false
        }

        const api = config.host + '/static/file/';

        let fileUrlPdf = api+file.pdf[0].filename
        let fileUrlPng = api+file.png[0].filename 

        const data = {
            name: name,
            description: description,
            pdf: fileUrlPdf,
            png: fileUrlPng,
            date: new Date()
        }
        
        storeLibros.add(data);
        resolve(data);
    })
    
}

// GET LIBRO CONTROLLER CAMPOS AND TYPE
function getLibros(filterLibro) {
    return new Promise((resolve,reject) => { resolve(storeLibros.list(filterLibro)) })
}

// UPDATE LIBRO CONTROLLER CAMPOS AND TYPE
function updateLibro(id,name,description,pdf,png) {
    return new Promise( async (resolve,reject) => {
        if (!id && !name && !description && !pdf && !png) reject('invalid data');
        const result = await storeLibros.update(id,name,description,pdf,png);
        resolve(result)
    })
}

// DELETE LIBRO CONTROLLER CAMPOS AND TYPE
function deleteLibro(id) {
    return new Promise ((resolve,reject) => {
        if (!id) reject('Falta id, no se encuentra')

        const api = config.host + '/static/file';
        const ruta = './public/file';

        getLibros(id).then( data => {

            if(data.length === 0) return reject('archivo no existe')

            const files = [
                data[0].pdf,
                data[0].png
            ]

            editFile.deleteFile(files, api, ruta);

            storeLibros.remove(id)
            .then( resolve("Se elimino el libro..." ) )
            .catch( e => { reject(e) })

        })
    })
}

// EXPORT FUNCTIONS
module.exports = {
    addLibro,
    getLibros,
    updateLibro,
    deleteLibro
}