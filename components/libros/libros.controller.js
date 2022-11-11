const storeLibros = require('./libros.store')

// ADD LIBRO CONTROLLER CAMPOS AND TYPE
function addLibro(name,description,file) {
    return new Promise((resolve,reject) => {

        let fileUri = '';
        let fileUriPng = ''

        if(!name || !description){
            reject('nombre y description no son validos')
            return false
        }

        if( file.pdf[0].mimetype != 'application/pdf'){
            reject('debes enviar un archivo pdf')
            return false
        }

        if( file.png[0].mimetype != 'image/jpeg' ){
            reject('debes enviar un archivo jpg')
            return false
        }

        const api = 'https://localhost:3000/uploads/file'
        // fileUri = 'https://mighty-tor-31120.herokuapp.com/uploads/file/' + pdf.filename
        fileUri = `${api}/` + name + file.pdf[0].filename
        fileUriPng = `${api}/` + name + file.png[0].filename

        const data = {
            name: name,
            description: description,
            pdf: fileUri.replace(/\s+/g, ''),
            png: fileUriPng.replace(/\s+/g, ''),
            date: new Date()
        }
        
        storeLibros.add(data);
    
        resolve(data);
    })
    
}

// GET LIBRO CONTROLLER CAMPOS AND TYPE
function getLibros(filterLibro) {
    return new Promise((resolve,reject) => {
        resolve(storeLibros.list(filterLibro))
    })
}

// UPDATE LIBRO CONTROLLER CAMPOS AND TYPE
function updateLibro(id,name,description,pdf) {
    return new Promise( async (resolve,reject) => {

        if (!id || !name || !description || !pdf) {
            reject('invalid data');
            return false
        }

        const result = await storeLibros.update(id,name,description,pdf);

        resolve(result)
    })
}

// DELETE LIBRO CONTROLLER CAMPOS AND TYPE
function deleteLibro(id) {
    return new Promise ((resolve,reject) => {
        if (!id) {
            reject('Falta id, no se encuentra')
            return false
        }

        storeLibros.remove(id)
            .then(() => {
                resolve("Se elimino el elemento:",id)
            })
            .catch( e => {
                reject(e)
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