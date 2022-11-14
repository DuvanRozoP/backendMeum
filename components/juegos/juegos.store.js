const model = require('./juegos.model')

function addJuego(juego) {
    const newJuego = new model(juego);
    newJuego.save()
}

async function getJuego(filterJuego) {
    let filter = {}

    if (filterJuego !== null) filter = { name: filterJuego }

    const juegos = await model.find(filter)
    return juegos
}

// encontrar juego para eliminar
async function getJuegoDelete(filterJuego) {
    let filter = {}

    if (filterJuego !== null) filter = { _id: filterJuego }

    const juegos = await model.find(filter)
    return juegos
}

async function updateJuego(id, name ,description, png1, png2, png3,png4, png5) {
    
    const modificador = await model.findOne({ _id: id });

    modificador.name = name;
    modificador.description = description;
    modificador.png1 = png1;
    modificador.png2 = png2;
    modificador.png3 = png3;
    modificador.png4 = png4;
    modificador.png5 = png5;

    const editData = await modificador.save();
    return editData;
}

function deleteJuego(id) {
    return model.deleteOne({
        _id: id
    })
}

module.exports = {
    add: addJuego,
    get: getJuego,
    update: updateJuego,
    remove: deleteJuego,
    getDelete: getJuegoDelete,
}