const storeSelfies = require('./selfies.store');

// ACTULIZANDO SELFIES DE GRUPO
const storeGrupo = require('../grupos/grupo.store');

// ADD SELFIES CAMPS AND VERFICED
function addSelfie(grupo,array) {
    return new Promise(async (resolve, reject) => {
        if(array.length === 0) return reject('Ingrese los datos necesarios')

        const data = {
            grupo: grupo,
            redes: array
        }

        storeSelfies.add(data)
        await actulizarGrupo(grupo).finally( resolve(data) )
    })
}

// GET SELFIES OBTENDREMOS LA LISTA COMPLETA DE SELFIES
function getSelfies(filterSelfies) {
    return new Promise((resolve, reject) => {
        resolve(storeSelfies.list(filterSelfies))
    })
}

// UPDATE SELFIES DEL ELEMENTO DE LA LISTA
function updateSelfies(id,grupo,redes) {
    return new Promise(async (resolve,reject) => {
        if(!id) return reject("ingrese el id");
        if(!grupo) return reject("ingrese el grupo");

        const result = await storeSelfies.update(id,redes);
        actulizarGrupo(grupo).finally( resolve(result) )
    })
}

// DELETE SELFIES ELIMINAREMOS UN ELEMENTO DE LA LISTA
function deleteSelfies(id,grupo) {
    return new Promise((resolve,reject) => {
        if(!id) return reject("Ingrese el ID")
        if(!grupo) return reject("Ingrese el grupo")

        getSelfies(id).then( data => {

            if(data.length === 0) return reject('archivo no existe')
            
            storeSelfies.remove(id)
            .then(() => {
                actulizarGrupo(grupo).finally( resolve("Se elimino Selfies...") )
            })
            .catch( e => { reject("No se a podido eliminar el selfie" + e) })
        })
    })
}

// FUNCTION PARA ACTULIAR EL GRUPO
async function actulizarGrupo(grupo) {
    await storeSelfies.getSelfies(grupo)
            .then(async data => {
                if(data == null) await storeGrupo.updateGrupoSelfies(grupo, [])
                if(data != null) await storeGrupo.updateGrupoSelfies(grupo, data)
            })
}

module.exports = {
    addSelfie,
    getSelfies,
    deleteSelfies,
    updateSelfies
}