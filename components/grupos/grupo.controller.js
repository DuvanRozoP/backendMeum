const storeGrupo = require('./grupo.store')
const storeLibro = require('../libros/libros.store')
const storeJuegos = require('../juegos/juegos.store')

function addGrupo(grupo,integrantes,libros,juegos,selfies) {
    return new Promise((resolve, reject) => {
        if(!grupo) return reject('ingrese el numero del grupo')
        if(integrantes.length === 0) return reject('integrantes vacios')
        
        const data = {
            grupo: grupo,
            integrantes: integrantes,
            libros: libros || [],
            juegos: juegos || [],
            selfies: selfies || [],
        }

        storeGrupo.add(data);
        resolve(data)
    })
}

function getGrupo(filterGrupo) {
    return new Promise((resolve,reject) => {
        resolve(storeGrupo.get(filterGrupo))
    })
}

function updateGrupo(id,numero,integrantes,libros,juegos,selfies) {
    return new Promise( async (resolve,reject) => {
        if(!id) return reject('ingresa el id del grupo');
    
        return reject('MANTENIMIENTO');
        /*const result = await storeGrupo.update(id,numero,integrantes,libros,juegos,selfies);
        return result*/
    })
}

// AGREGAR DATOS ESPECIFICOS
function updateLibroGrupo(numero) {
    return new Promise((resolve,reject) => {
        const libros = storeLibro.getLibroPostGrupo(numero);
        resolve(libros)
    })
}

function updateJuegoGrupo(numero) {
    return new Promise((resolve,reject)=> {
        const juegos = storeJuegos.getJuegoPostGrupo(numero);
        if(juegos.length === 0) return reject([])
        resolve(juegos)
    })
}
// --
module.exports = {
    addGrupo,
    getGrupo,
    updateGrupo,
    updateLibroGrupo,
    updateJuegoGrupo,
}