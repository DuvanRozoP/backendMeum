const storeJuegos = require('./juegos.store')
const editFile = require('../../file');
const config = require('../../config.server');

// ACTUALIZANDO JUEGOS DE GRUPO 
const storeGrupo = require('../grupos/grupo.store');
// --

// ADD JUEGO AND CONTROLLER REQUEST BODY
function addJuego(grupo, name, description, file) {
    return new Promise((resolve, reject) => {

        if(!name || !description || !file) reject('nombre, description y/o archivos no son validos')

        const api = config.host + '/static/juegos/';

        const data = {
            grupo: grupo,
            name: name,
            description: description,
            png1: api + file.png1[0].filename,
            png2: api + file.png2[0].filename,
            png3: api + file.png3[0].filename,
            png4: api + file.png4[0].filename,
            png5: api + file.png5[0].filename,
        }
 
        storeJuegos.add(data);
        actualizarGrupo(grupo)
        resolve(data);
    })
}

// ENCONTRAR ELEMENTO 
function getJuego(filterJuego) {
    return new Promise((resolve,reject) => {
        resolve(storeJuegos.get(filterJuego))
    })
}

// UPDATE JUEGO CONTROLLER CAMPOS AND TYPE
function updateJuego(id,grupo,name,description,files) {
    return new Promise(async (resolve,reject) => {
        if(!id || !name || !description || !files) reject('invalid data')

        const api = config.host + '/static/juegos/';
        const ruta = './public/juegos/';

        const file = {
            png1: api + files.png1[0].filename,
            png2: api + files.png2[0].filename,
            png3: api + files.png3[0].filename,
            png4: api + files.png4[0].filename,
            png5: api + files.png5[0].filename,
        } 

        getJuego(id).then(async data => {
            const fileBefore = [
                data[0].png1,
                data[0].png2,
                data[0].png3,
                data[0].png4,
                data[0].png5,
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
            const result = await storeJuegos.update(id,name,description,file);
            actualizarGrupo(grupo);
            resolve(result)
        })

    })
}

//  ELIMINAR FILES Y DOCUMENTS
function deleteJuego(id,grupo) {
    return new Promise((resolve,reject) => {
        if(!id) reject('Ingrese la id del elemento que desea eliminar')

        const api = config.host + '/static/juegos';
        const ruta = './public/juegos';
        
        getJuego(id).then( data => {
            
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
            .then(() => { 
                actualizarGrupo(grupo);
                resolve("Se elimino el Juego...");
            })
            .catch( e => { reject("No se a podido eliminar el juego" + e) })
        })  
        
    })
}

// FUNCTION UPDATE GRUPO
async function actualizarGrupo(grupo) {
    
    await storeJuegos.getJuegoGrupoNumero(grupo)
            .then(async data => {
                if(data == null) await storeGrupo.updateGrupoJuego(grupo,[])
                
                if(data != null) await storeGrupo.updateGrupoJuego(grupo,data)
            })
}
// --
module.exports = { 
    addJuego,
    getJuego,
    updateJuego,
    deleteJuego
}