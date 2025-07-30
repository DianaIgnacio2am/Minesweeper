'use strict';

function iniciarJuego() {
  var btnReiniciar = document.getElementById('btnReiniciar');
  var btnCerrarModal = document.getElementById('btnCerrarModal');
  var saludoJugador = document.getElementById('saludoJugador');

  // Solicitar nombre jugador con validación mínima 3 letras
  var nombreJugador = prompt('Ingresa tu nombre (mínimo 3 letras):');
  while (!nombreJugador || nombreJugador.length < 3) {
    nombreJugador = prompt('Nombre inválido. Ingresa tu nombre (mínimo 3 letras):');
  }
  saludoJugador.textContent = 'Jugador: ' + nombreJugador;

  // Mostrar minas iniciales
  actualizarContadorMinas();

  // Crear y configurar tablero
  crearTablero();
  colocarMinas();
  contarMinasAlrededor();
  agregarEventosCeldas();

  // Reiniciar juego con botón
  btnReiniciar.addEventListener('click', reiniciarJuego);

  // Cerrar modal con botón
  btnCerrarModal.addEventListener('click', ocultarModal);

  // Reiniciar juego con barra espaciadora
  document.body.addEventListener('keydown', function(e) {
    if (e.keyCode === 32) { // barra espacio
      e.preventDefault();
      reiniciarJuego();
    }
  });
}
  
// Se llama cuando se inicia o reinicia la partida
function reiniciarJuego() {
  juegoIniciado = false;
  minasRestantes = totalMinas;
  actualizarContadorMinas();
  var temporizadorElem = document.getElementById('temporizador');
  temporizadorElem.textContent = '⏱️ Tiempo: 0s';

  crearTablero();
  colocarMinas();
  contarMinasAlrededor();
  agregarEventosCeldas();

  ocultarModal(); // ocultar modal si está visible
}

function ocultarModal() {
  var modal = document.getElementById('modalResultado');
  modal.className = 'modal oculto';
}

// Aquí atamos los eventos de click izquierdo y derecho para cada celda
function agregarEventosCeldas() {
  for (var fila = 0; fila < filas; fila++) {
    for (var col = 0; col < columnas; col++) {
      var celda = tablero[fila][col].elemento;

      // click izquierdo: revelar celda
      celda.onclick = (function(f, c) {
        return function() {
          revelarCelda(f, c);
        };
      })(fila, col);

      // click derecho: marcar/desmarcar bandera
      celda.oncontextmenu = (function(f, c) {
        return function(e) {
          e.preventDefault();
          marcarCelda(e);
        };
      })(fila, col);
    }
  }
}

// Ejecutamos iniciarJuego al cargar la página
window.onload = iniciarJuego;
