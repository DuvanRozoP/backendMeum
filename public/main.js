
// CONTROL DE LOS ESTADO DEL MENU
const _API_ = 'https://richardardilaayala.herokuapp.com'
//const _API_PRO = 'https://mighty-tor-31120.herokuapp.com/libros'

// ESTADO DE LA PAGINA
const home = document.getElementById('containerfront');
const libros = document.getElementById('containerLibros');
const searchLibros = document.querySelector('.botonSerach');
const searchLibros2 = document.querySelector('.inputLibro');
const serachLibros3 = document.querySelector('.containerSearch')

// MOSTRAR STATUS PROFESOR

// BOTONES DEL MENU
const botonLibro = document.getElementById('botonLibross');
const botonJuegos = document.getElementById('botonJuegos');
const botonSelfies = document.getElementById('botonSelfies');
const botonGrupo = document.getElementById('botonGrupo')
const botonProfesor = document.getElementById('botonProfesor')
const botonLogo = document.getElementById('logo');

// ELEMENTOS PADRES 
const contendorArticulos = document.getElementById('containerLibros');

// ELEMENTOS DE PROFESOR
const contenedorGrupos = document.querySelector('.contenedorGrupos');


// 
startPage() // INICIAR ESTADO PRINCIPAL
createElementLibros()   

botonLogo.addEventListener('click', () => { // VOLVER A HOME
    removeClassDesaparecer(home)
    addClassDesaparecer(libros,searchLibros,searchLibros2)
})

botonLibro.addEventListener('click', () => { // MOSTRAR LIBROS
    console.log('click libros')
    removeClassDesaparecer(libros,searchLibros,searchLibros2)
    addClassDesaparecer(home)
})    

botonJuegos.addEventListener('click', () => { // MOSTRAR JUEGOS
    console.log('click juego')
})

botonProfesor.addEventListener('click', () => {
    mostrarData()
    addClassDesaparecer(home,libros,searchLibros,searchLibros2,serachLibros3);
    //removeClassDesaparecer();
})

// MOSTRAR CONSUMO API
async function mostrarData() {
    let html = '';
    let integrantes = '';

    await fetch(`${_API_}/grupos`)
    .then(data => data.json())
    .then(respuesta => {
        
        respuesta.succes.map( data => {

            for(const inte in data.integrantes[0]) { // HTML DE LOS INTEGRANTES ENCARGADO DE DIFERENTE TAREAS
                data.integrantes[0][inte].map( data => {
                    if(inte == "juego" ){ integrantes += `<p class="JuegoAc"> ${data} </p>` }
                    if(inte == "Selfie" ){ integrantes += `<p class="SelfieAc"> ${data} </p>` }
                    if(inte == "libro" ){ integrantes += `<p class="LibroAc"> ${data} </p>` }
                })
            }

            html += `
            <article class="grupo">
                <h3 class="numeroGrupo">${data.grupo}</h3>
                <section class="integrantes">
                    ${integrantes}
                </section>
            </article>
            `
        })


    })

    contenedorGrupos.innerHTML = html;
}

async function mostrarLibros() {
    await fetch(`${_API_}/grupos`)
    .then(data => data.json())
    .then(respuesta => {
        
    })
}

// ---

function startPage(){
    addClassDesaparecer(libros,searchLibros,searchLibros2)
}

// LOGICA DE CREACIONES DE ARTICULOS DEL PROFE REQUIERE

async function createElementLibros() {
    /*await fetch(`${_API_}/grupos`)
    .then(data => data.json())
    .then(respuesta => console.log(respuesta))*/

    /*
    let html = ''
        
    respuesta.succes.map( data => {
        html += `
        <article class="articulo" >
            <img class="imagenLibro" src="${data.png}" alt="">
            <h5 class="titulo" > ${data.name} </h5>
            <p class="description" > ${data.description} </p>
        </article>`
    })
    html.toString()
    contendorArticulos.innerHTML = html;
    */
}


// MODIFICACIONES DE CLASES

function addClassDesaparecer(...element) {
    element.map( elemento => {
        elemento.classList.add('desaparecer')   
    })
}

function removeClassDesaparecer(...element) {
    element.map( elemento => {
        elemento.classList.remove('desaparecer')   
    })
}