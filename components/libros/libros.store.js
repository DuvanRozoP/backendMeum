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
// OBTENER LIBROS PARA ENVIAR A GRUPOS
async function getLibroPostGrupo(filterLibro) {
    let filter = {}
    if (filterLibro !== null) { filter = { grupo: filterLibro } }
    const libros = await model.find(filter)
    return libros;
}

async function updateLibro(id,name,description,file) {
    const modificador = await model.findOne({
        _id: id
    })

    if(name != null) modificador.name = name
    if(description != null) modificador.description = description
    if(file.pdf != null) modificador.pdf = file.pdf
    if(file.png != null) modificador.png = file.png

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
    getLibroPostGrupo
}