const storeGrupo = require('./grupo.store')

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

function updateGrupo(id,integrantes) {
    return new Promise( async (resolve,reject) => {
        if(!id) return reject('ingresa el id del grupo');
        if(!integrantes) return reject('datos vacios');

        const result = await storeGrupo.update(id,integrantes);
        resolve(result);
    })
}

// DELETE GRUPO CONTROLLER CAMPOS AND TYPE
function deleteGrupo(id){
    return new Promise((resolve,reject) => {
        
        if(!id) return reject('falta id, no se encuentra');

        getGrupo(id).then(data => {
            console.log(data)
            if(data.length === 0) return reject('elemento no existe')
            
            storeGrupo.remove(id)
            .then(() => {
                resolve("se elimino Grupo...");
            })
            .catch( e => { reject("No se a podido eliminar el Grupo" + e) })
            
        })
    })
}

module.exports = {
    addGrupo,
    getGrupo,
    updateGrupo,
    deleteGrupo,
}