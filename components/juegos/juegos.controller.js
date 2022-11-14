const storeJuegos = require('./juegos.store')
const editFile = require('../../file');
const config = require('../../config.server');

// ADD JUEGO AND CONTROLLER REQUEST BODY
function addJuego(name, description, file) {
    return new Promise((resolve, reject) => {

        // console.log(file.png1[0].mimetype !== 'image/jpeg')
        // console.log(file.png1[0].mimetype !== 'image/png')
        // console.log(!file.png1[0].mimetype)

        if(!name || !description || !file) reject('nombre, description y/o archivos no son validos')

        const api = config.host + '/static/juegos/';

        const data = {
            name: name,
            description: description,
            png1: api + file.png1[0].filename,
            png2: api + file.png2[0].filename,
            png3: api + file.png3[0].filename,
            png4: api + file.png4[0].filename,
            png5: api + file.png5[0].filename,
        }

        getJuego
        
        storeJuegos.add(data);
        resolve(data);
    })
}

// ENCONTRAR ELEMENTO 
function getJuego(filterJuego) {
    return new Promise((resolve,reject) => {
        resolve(storeJuegos.get(filterJuego))
    })
}

// OBTENER ELEMENTO POR ID
function getDelete(filterJuego) {
    return new Promise((resolve,reject) => { resolve(storeJuegos.getDelete(filterJuego)) })
}

//  ELIMINAR FILES Y DOCUMENTS
function deleteJuego(id) {
    return new Promise((resolve,reject) => {
        if(!id) reject('Ingrese la id del elemento que desea eliminar')

        const api = config.host + '/static/juegos';
        const ruta = './public/juegos'
        
        getDelete(id).then( data => {
            
            if(data.length === 0) return reject('archivo no existe')

            const files = [
                data[0].png1,
                data[0].png2,
                data[0].png3,
                data[0].png4,
                data[0].png5,
            ]

            editFile.deleteFile(files,api,ruta);

            storeJuegos.remove(id)
            .then( resolve("se elimino el juego...") )
            .catch( e => { reject("No se a podido eliminar el juego" + e) })

        })
    })
}

module.exports = { 
    addJuego,
    getJuego,
    deleteJuego
}