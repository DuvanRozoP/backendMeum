const storeLibros = require('./libros.store');
const editFile = require('../../file')

// ADD LIBRO CONTROLLER CAMPOS AND TYPE
function addLibro(name,description,file) {
    return new Promise((resolve,reject) => {

        if(!name || !description) reject('nombre y description no son validos')
        if( file.pdf[0].mimetype != 'application/pdf') reject('debes enviar un archivo pdf')
        if( file.png[0].mimetype != 'image/jpeg' ) reject('debes enviar un archivo jpg')


        const api = 'https://localhost:3000/static/file'
        let fileUri = `${api}/`+file.pdf[0].filename
        let fileUriPng = `${api}/`+file.png[0].filename

        const data = {
            name: name,
            description: description,
            pdf: fileUri,
            png: fileUriPng,
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

        const api = 'https://localhost:3000/static/file/'

        getLibros(id).then( data => {

            
            try {

                if(data[0].pdf) editFile.deleteFile(data[0].pdf.replace(api,'').replace(/\s+/g, ''))
                if(data[0].png) editFile.deleteFile(data[0].png.replace(api,'').replace(/\s+/g, ''))

            } catch (error) {
                // NO HACE NADA
            }

            storeLibros.remove(id)
            .then(() => {
                resolve("Se elimino el elemento...")
            })
            .catch( e => {
                reject(e)
            }) 
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