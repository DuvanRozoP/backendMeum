const model = require('./libros.model')

function addLibros(libro) {
    const newlibro = new model(libro);
    newlibro.save()
}

async function getLibro(filterLibro) {
    let filter = {}

    if (filterLibro !== null) {
        filter = { _id: filterLibro }
    }
    const libros = await model.find(filter)
    return libros;
}

async function updateLibro(id, name,description,pdf,png) {
    const modificador = await model.findOne({
        _id: id
    })

    modificador.name = name
    modificador.description = description
    modificador.pdf = pdf
    modificador.png = png

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