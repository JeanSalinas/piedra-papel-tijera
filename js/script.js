const vidasJugador = document.getElementById('vidasJugador')
const vidasMaquina = document.getElementById('vidasMaquina')
const inicioFin = document.getElementById('inicioFin')
const imgEleccionJ = document.getElementById('eleccionJugador')
const imgEleccionM = document.getElementById('eleccionMaquina')
const resultado = document.getElementById('resultado')

let vidasJ = 3; 
let vidasM = 3;

function actualizarVidas(){
    vidasJugador.textContent = 'Jugador:' + '♥️'.repeat(vidasJ)
    vidasMaquina.textContent = 'Máquina:' + '♥️'.repeat(vidasM)
}

const opcionesMaquina = ['piedra', 'papel' , 'tijera']

function eleccionMaquina() {
    let elecmaqu = Math.floor(Math.random()*3)
    return opcionesMaquina[elecmaqu]
}

function finJuego(){
    if(vidasJ === 0 || vidasM === 0){
        desactivarBotones()
        mostrarBtnReinicio()
        resultado.classList.remove('victoria','derrota')
        inicioFin.textContent = 'Fin de la batalla ⚔️'
        if(vidasJ === 0){
            resultado.classList.add('derrota')
            resultado.textContent = '!Haz perdido la batalla! 😣'
        }
        if (vidasM === 0) {
            resultado.classList.add('victoria')
            resultado.textContent = '¡Haz ganado la batalla! 🎉'
        }
    }
}

function desactivarBotones(){
    const botones = document.querySelectorAll('.btnOpcion')
    botones.forEach(boton => {
        boton.disabled = true
        boton.classList.add('btnDesactivado')
    })
}

function activarBotones(){
    const botones = document.querySelectorAll('.btnOpcion')
    botones.forEach(boton => {
        boton.disabled = false
        boton.classList.remove('btnDesactivado')
    })
}

document.addEventListener('DOMContentLoaded',() => {
    ocultarBtnReinicio()
})

function mostrarBtnReinicio(){
    const reinicio = document.getElementById('btnReiniciarJuego')
    reinicio.classList.remove('desactivado')
    reinicio.classList.add('activado')
}

function ocultarBtnReinicio(){
    const reinicio = document.getElementById('btnReiniciarJuego')
    reinicio.classList.remove('activado')
    reinicio.classList.add('desactivado')
}

function combate(eleccionJ){
    let eleccionM = eleccionMaquina()

    resultado.classList.remove('victoria','derrota')

    imgEleccionJ.src = `./assets/images/${eleccionJ}.png`
    imgEleccionM.src = `./assets/images/${eleccionM}.png`

    if(eleccionJ === eleccionM){
        resultado.textContent = '¡Ronda Empatada 🫱🏻‍🫲🏻!'
    }
    else if(
        (eleccionJ === 'piedra' && eleccionM === 'tijera')||
        (eleccionJ === 'papel' && eleccionM === 'piedra')||
        (eleccionJ === 'tijera' && eleccionM === 'papel')
    ){
        vidasM--
        resultado.classList.add('victoria')
        resultado.textContent = '¡Haz ganado esta ronda 👌🏻!'
    }else {
        vidasJ--
        resultado.classList.add('derrota')
        resultado.textContent = '¡Haz perdido esta ronda 👎🏻!'
    }
    finJuego()
    actualizarVidas()
}

function reiniciarJuego(){
    vidasJ = 0; vidasM = 0
    actualizarVidas()
    inicioFin.textContent = 'Reiniciando...🔄️'
    desactivarBotones()
    ocultarBtnReinicio()
    resultado.textContent = ''
    imgEleccionJ.src = ''
    imgEleccionM.src = ''
    setTimeout(() => {
        vidasJ = 3; vidasM = 3
        actualizarVidas()
        inicioFin.textContent = '¡Haz tu elección!'
        activarBotones()
        resultado.textContent = ''
    }, 1000);
}
actualizarVidas()