const model = require('./juegos.model')

function addJuego(juego) {
    const newJuego = new model(juego);
    newJuego.save()
}

async function getJuego(filterJuego) {
    let filter = {}

    if (filterJuego !== null) filter = { _id: filterJuego }

    const juegos = await model.find(filter)
    return juegos
}

// OBTENER DATOS POR NUMERO DE GRUPO
async function getJuegoGrupoNumero(filterJuego) {
    let filter = {}

    if (filterJuego !== null) filter = { grupo: filterJuego }

    const juegos = await model.find(filter)
    return juegos
}

async function updateJuego(id, name ,description, files) {
    
    const modificador = await model.findOne({ _id: id });

    if(name) modificador.name = name;
    if(description) modificador.description = description;
    if(files.png1) modificador.png1 = files.png1;
    if(files.png2) modificador.png2 = files.png2;
    if(files.png3) modificador.png3 = files.png3;
    if(files.png4) modificador.png4 = files.png4;
    if(files.png5) modificador.png5 = files.png5;

    const editData = await modificador.save();
    return editData;
}

function deleteJuego(id) {
    return model.deleteOne({
        _id: id
    })
}

// OBTENER LIBROS PARA ENVIAR A GRUPOS
async function getJuegoPostGrupo(filterJuegos) {
    let filter = {}
    if (filterJuegos !== null) filter = { grupo: filterJuegos } 

    const juegos = await model.find(filter)
    return juegos;
}

module.exports = {
    add: addJuego,
    get: getJuego,
    update: updateJuego,
    remove: deleteJuego,
    getJuegoPostGrupo,
    getJuegoGrupoNumero
}