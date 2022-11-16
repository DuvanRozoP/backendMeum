const model = require('./selfies.model')

// AGREGAR A LA BASE DE DATOS COLLETION SELFIES
function addSelfie(selfies) {
    const newSelfies = new model(selfies);
    newSelfies.save();
}

// OBTENER SELFIES POR NUMERO DEL GRUPO
async function getSelfiesUpdateGrupo(grupo) {
    let filtro = { grupo: grupo }
    const selfies = await model.find(filtro);
    return selfies;
}

// OBTENER LISTA DE SELFIES
async function getSelfie(filterSelfies) {
    let filter = {}
    if(filterSelfies !== null) filter = { _id: filterSelfies };
    const selfies = await model.find(filter);
    return selfies
}

// ELIMINAR UN ELEMENTO DE LA LISTA SELFIE
function deleteSelfie(id) {
    return model.deleteOne({
        _id: id
    })
}

// ACTUALIZAR UN ELEMENTO DE LA LISTA SELFIE
async function updateSelfie(id,redes) {
    const modificador = await model.findOne({ _id: id });
    if(redes != null ) modificador.redes = redes;
    const editData = await modificador.save();
    return editData
}

module.exports = {
    add: addSelfie,
    list: getSelfie,
    update: updateSelfie,
    remove: deleteSelfie,
    getSelfies: getSelfiesUpdateGrupo,
}

