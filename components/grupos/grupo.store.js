const model = require('./grupo.model');

function addGrupo(grupo) {
    const newGrupo = new model(grupo);
    newGrupo.save();
}

async function getGrupo(filterGrupo) {
    let filter = {}
    if (filterGrupo !== null) filter = { _id: filterGrupo }

    const grupo = await model.find(filter)
    return grupo;
}

async function updateGrupo(id,integrantes) {
    const modificador = await model.findOne({ _id: id })
    if(integrantes != null ) modificador.integrantes = integrantes;

    const editData = await modificador.save()
    return editData;
}

function deleteGrupo(id) {
    return model.deleteOne({
        _id: id
    })
}

async function updateGrupoLibro(grupo,libros) {
    const modificador = await model.findOne({ grupo: grupo })
    modificador.libros = libros;
    const editData = await modificador.save()
    return editData;
}

async function updateGrupoJuego(grupo,juegos) {
    const modificador = await model.findOne({ grupo: grupo })
    modificador.juegos = juegos;
    const editData = await modificador.save();
    return editData;
}

async function updateGrupoSelfies(grupo,selfies) {
    const modificador = await model.findOne({ grupo: grupo })
    modificador.selfies = selfies;
    const editData = await modificador.save();
    return editData;
}


module.exports = {
    add: addGrupo,
    get: getGrupo,
    remove: deleteGrupo,
    update: updateGrupo,
    updateGrupoLibro,
    updateGrupoJuego,
    updateGrupoSelfies
} 
