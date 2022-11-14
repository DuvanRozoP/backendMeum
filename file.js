const fs = require('fs');

function deleteFile(file, api, ruta){ 

    file.map(element => {
        if(readFile(element, api, ruta )){
            fs.unlinkSync(ruta + element.replace(api,'').replace(/\s+/g, ''))
        }
    })

}

function readFile(file,api,ruta) {
    return fs.existsSync(ruta + file.replace(api,'').replace(/\s+/g, ''))
}


module.exports = {
    deleteFile
}