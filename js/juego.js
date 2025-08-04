'use strict';

var sonidoExplosion = new Audio("sounds/explosion.mp3");

window.addEventListener("DOMContentLoaded", function () {
  var saludoJugador = document.getElementById("saludoJugador");
  var nombre = localStorage.getItem("jugador");

  if (nombre) {
    saludoJugador.textContent = "Jugador: " + nombre;
  } else {
    saludoJugador.textContent = "Jugador: Invitado";
  }
});

var juegoIniciado = false;
var tiempo = 0;
var temporizadorId = null;
var minasRestantes = totalMinas;

function iniciarTemporizador() {
  if (juegoIniciado) return;
  juegoIniciado = true;
  tiempo = 0;
  var temporizadorElem = document.getElementById('temporizador');
  temporizadorId = setInterval(function() {
    tiempo++;
    temporizadorElem.textContent = '⏱️ Tiempo: ' + tiempo + 's';
  }, 1000);
}

function detenerTemporizador() {
  clearInterval(temporizadorId);
  juegoIniciado = false;
}

function actualizarContadorMinas() {
  var contadorMinasElem = document.getElementById('contadorMinas');
  contadorMinasElem.textContent = '💣 Minas: ' + minasRestantes;
}

function revelarCelda(fila, col) {
  var celdaObj = tablero[fila][col];
  if (celdaObj.descubierta || celdaObj.marcada) return;

  if (!juegoIniciado) {
    iniciarTemporizador();
  }

  celdaObj.descubierta = true;
  celdaObj.elemento.className = 'celda descubierta';
  celdaObj.elemento.disabled = true;

  if (celdaObj.mina) {
    celdaObj.elemento.textContent = '💣';
    sonidoExplosion.play();
    terminarJuego(false);
    return;
  }

  var minasCerca = celdaObj.minasAlrededor;
  if (minasCerca > 0) {
    celdaObj.elemento.textContent = minasCerca;
  } else {
    celdaObj.elemento.textContent = '';
    revelarVecinas(fila, col);
  }

  comprobarVictoria();
}

function revelarVecinas(fila, col) {
  for (var f = fila - 1; f <= fila + 1; f++) {
    for (var c = col - 1; c <= col + 1; c++) {
      if (
        f >= 0 && f < filas &&
        c >= 0 && c < columnas &&
        !(f === fila && c === col)
      ) {
        revelarCelda(f, c);
      }
    }
  }
}

function marcarCelda(e) {
  e.preventDefault();
  var celda = e.target;
  var fila = parseInt(celda.getAttribute('data-fila'), 10);
  var col = parseInt(celda.getAttribute('data-col'), 10);
  var celdaObj = tablero[fila][col];

  if (celdaObj.descubierta) return;

  if (celdaObj.marcada) {
    celdaObj.marcada = false;
    celda.className = 'celda';
    minasRestantes++;
  } else {
    celdaObj.marcada = true;
    celda.className = 'celda marcada';
    minasRestantes--;
  }

  actualizarContadorMinas();
}

function comprobarVictoria() {
  var celdasDescubiertas = 0;
  var totalCeldas = filas * columnas;
  for (var fila = 0; fila < filas; fila++) {
    for (var col = 0; col < columnas; col++) {
      if (tablero[fila][col].descubierta) {
        celdasDescubiertas++;
      }
    }
  }
  if (celdasDescubiertas === totalCeldas - totalMinas) {
    terminarJuego(true);
  }
}

function terminarJuego(gano) {
  detenerTemporizador();
  mostrarModal(gano ? '¡Ganaste! 🎉' : '¡Perdiste! 💥');

  for (var fila = 0; fila < filas; fila++) {
    for (var col = 0; col < columnas; col++) {
      tablero[fila][col].elemento.disabled = true;
      if (tablero[fila][col].mina && !tablero[fila][col].marcada) {
        tablero[fila][col].elemento.textContent = '💣';
      }
    }
  }
}

function mostrarModal(mensaje) {
  var modal = document.getElementById('modalResultado');
  var mensajeElem = document.getElementById('mensajeResultado');
  var btnCerrar = document.getElementById('btnCerrarModal');

  mensajeElem.textContent = mensaje;
  btnCerrar.textContent = 'Reiniciar';
  modal.className = 'modal';
}

function ocultarModal() {
  var modal = document.getElementById('modalResultado');
  modal.className = 'modal oculto';
  reiniciarJuego();
}

document.addEventListener('DOMContentLoaded', function() {
  var btnCerrar = document.getElementById('btnCerrarModal');
  btnCerrar.addEventListener('click', function() {
    ocultarModal();
  });
});

function reiniciarJuego() {
  clearInterval(temporizadorId);
  juegoIniciado = false;
  tiempo = 0;
  minasRestantes = totalMinas;
  actualizarContadorMinas();

  var temporizadorElem = document.getElementById('temporizador');
  temporizadorElem.textContent = '⏱️ Tiempo: 0s';

  crearTablero();
  colocarMinas();
  contarMinasAlrededor();
  agregarEventosCeldas();
}

document.addEventListener("DOMContentLoaded", function () {
  var btnReiniciar = document.getElementById("btnReiniciar");
  btnReiniciar.addEventListener("click", reiniciarJuego);
});

document.getElementById('btn-jugar').addEventListener('click', function() {
  reiniciarJuego();
  this.style.display = 'none';
});

function agregarEventosCeldas() {
  for (var fila = 0; fila < filas; fila++) {
    for (var col = 0; col < columnas; col++) {
      var celda = tablero[fila][col].elemento;
      celda.onclick = (function(f, c) {
        return function() {
          revelarCelda(f, c);
        };
      })(fila, col);

      celda.oncontextmenu = (function(f, c) {
        return function(e) {
          marcarCelda(e);
        };
      })(fila, col);
    }
  }
}

// Modo oscuro
var btnModo = document.getElementById("toggleModo");

btnModo.addEventListener("click", function() {
  var enModoOscuro = document.body.classList.toggle("modo-oscuro");

  if (enModoOscuro) {
    activarModoOscuro();
  } else {
    desactivarModoOscuro();
  }

  localStorage.setItem("modo", enModoOscuro ? "oscuro" : "claro");
});

function activarModoOscuro() {
  document.body.classList.add("modo-oscuro");
  btnModo.setAttribute("aria-pressed", "true");
  btnModo.textContent = "☀️ Modo claro";
  btnModo.setAttribute("aria-label", "Activar modo claro");
}

function desactivarModoOscuro() {
  document.body.classList.remove("modo-oscuro");
  btnModo.setAttribute("aria-pressed", "false");
  btnModo.textContent = "🌙 Modo oscuro";
  btnModo.setAttribute("aria-label", "Activar modo oscuro");
}

// Al cargar la página, aplicar modo guardado
window.addEventListener("DOMContentLoaded", function() {
  var modoGuardado = localStorage.getItem("modo");

  if (modoGuardado === "oscuro") {
    activarModoOscuro();
  } else {
    desactivarModoOscuro();
  }
});
