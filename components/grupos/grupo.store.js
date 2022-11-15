const model = require('./grupo.model');

function addGrupo(grupo) {
    console.log(grupo)
    const newGrupo = new model(grupo);
    newGrupo.save();
}

async function getGrupo(filterGrupo) {
    let filter = {}
    if (filterGrupo !== null) filter = { grupo: filterGrupo }

    const grupo = await model.find(filter)
    return grupo;
}

async function updateGrupo(id,numero,integrantes,libros,juegos,selfies) {
    const modificador = await model.findOne({ _id: id })

    modificador.integrantes = integrantes;
    modificador.libros = libros;
    modificador.juegos = juegos;
    modificador.selfies = selfies;

    const editData = await modificador.save()
    return editData;
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
    update: updateGrupo,
    updateGrupoLibro,
    updateGrupoJuego
} 
