const controllerGrupoJuego = require('../components/grupos/grupo.controller')
const storeGrupo = require('../components/grupos/grupo.store')
const storeJuegos = require('../components/juegos/juegos.store')

async function actualizarGrupo(grupo) {
    
    await storeJuegos.getJuegoGrupoNumero(grupo)
            .then(async data => {
                if(data == null) await storeGrupo.updateGrupoJuego(grupo,[])
                
                if(data != null) await storeGrupo.updateGrupoJuego(grupo,data)

                console.log(data)
            })
}

module.exports = {
    actualizarGrupo
}