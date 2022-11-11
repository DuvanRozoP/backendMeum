const model = require('./libros.model')

function addLibros(libro) {
    const newlibro = new model(libro);
    newlibro.save()
}

async function getLibro(filterLibro) {
    let filter = {}

    if (filterLibro !== null) {
        filter = { name: filterLibro }
    }
    const libros = await model.find(filter)
    return libros;
}

async function updateLibro(id, name,description,pdf) {
    const modificador = await model.findOne({
        _id: id
    })

    modificador.name = name
    modificador.description = description
    modificador.pdf = pdf

    const editData = await modificador.save()
    return editData;
}

function deleteLibro(id) {
    return model.deleteOne({
        _id: id
    })
}

module.exports = {
    add: addLibros,
    list: getLibro,
    update: updateLibro,
    remove: deleteLibro,
}