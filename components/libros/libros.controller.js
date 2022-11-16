const storeLibros = require('./libros.store');
const editFile = require('../../file');
const config = require('../../config.server');

//ACTULIZANDO LIBROS DE GRUPO
const storeGrupo = require('../grupos/grupo.store')
// --

// ADD LIBRO CONTROLLER CAMPOS AND TYPE
function addLibro(grupo,name,description,file) {
    return new Promise((resolve,reject) => {

        if(!grupo || !name || !description) reject('nombre y description no son validos')

        const api = config.host + '/static/file/'; 

        const data = {
            grupo: grupo,
            name: name,
            description: description,
            pdf: api + file.pdf[0].filename,
            png: api + file.png[0].filename,
            date: new Date()
        }
        
        storeLibros.add(data);
        //actulizarGrupo(grupo)
        resolve(data);
    })
    
}

// GET LIBRO CONTROLLER CAMPOS AND TYPE
function getLibros(filterLibro) {
    return new Promise((resolve,reject) => { resolve(storeLibros.list(filterLibro)) })
}

// UPDATE LIBRO CONTROLLER CAMPOS AND TYPE
function updateLibro(id,grupo,name,description,files) {
    return new Promise( async (resolve,reject) => {
        if (!id || !name || !description || !files) reject('invalid data');

        const api = config.host + '/static/file/';
        const ruta = './public/file/';

        const file = {
            pdf: api + files.pdf[0].filename,
            png: api + files.png[0].filename,
        }

        getLibros(id).then(async data => {
            const fileBefore = [
                data[0].pdf,
                data[0].png,
            ];

            for (const after in file) {
                fileBefore.map( dato => {
                    if(dato == file[after]) {
                        let indice = fileBefore.indexOf(dato);
                        fileBefore.splice(indice,1)
                    } 
                })
            }
            
            editFile.deleteFile(fileBefore, api, ruta);
            const result = await storeLibros.update(id,name,description,file);
            actulizarGrupo(grupo)
            resolve(result);
        })
    })
}

// DELETE LIBRO CONTROLLER CAMPOS AND TYPE
function deleteLibro(id,grupo) {
    return new Promise ((resolve,reject) => {
        if (!id) reject('Falta id, no se encuentra')

        const api = config.host + '/static/file';
        const ruta = './public/file';

        getLibros(id).then( data => {

            if(data.length === 0) return reject('archivo no existe')

            const files = [
                data[0].pdf,
                data[0].png,
            ]

            editFile.deleteFile(files, api, ruta);
            storeLibros.remove(id)
            .then(() => {
                actulizarGrupo(grupo);
                resolve("Se elimino el libro..." );
            })
            .catch( e => { reject("No se a podido eliminar el libro" + e) })
        })
    })
}

// FUNCTION UPDATE GRUPO
async function actulizarGrupo(grupo) {
    await storeLibros.getLibroPostGrupo(grupo)
            .then(async data => {
                if(data == null) await storeGrupo.updateGrupoLibro(grupo, [])

                if(data != null) await storeGrupo.updateGrupoLibro(grupo, data)
            })
}
// EXPORT FUNCTIONS
module.exports = {
    addLibro,
    getLibros,
    updateLibro,
    deleteLibro
}