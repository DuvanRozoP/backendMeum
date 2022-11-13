
const fs = require('fs');

function deleteFile(file){ 
    fs.unlinkSync('./public/file/' + file)
}

module.exports = {
    deleteFile
}