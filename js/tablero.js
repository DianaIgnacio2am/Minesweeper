'use strict';

var filas = 8;
var columnas = 8;
var totalMinas = 10;

var tablero = [];
var minasColocadas = 0;

function crearTablero() {
  tablero = [];
  var tableroElem = document.getElementById('tablero');
  tableroElem.innerHTML = '';

  for (var fila = 0; fila < filas; fila++) {
    tablero[fila] = [];
    for (var col = 0; col < columnas; col++) {
      var celda = document.createElement('button');
      celda.classList.add('celda');
      celda.dataset.fila = fila;
      celda.dataset.col = col;
      celda.disabled = false;

      tableroElem.appendChild(celda);

      tablero[fila][col] = {
        mina: false,
        descubierta: false,
        marcada: false,
        elemento: celda,
        minasAlrededor: 0
      };
    }
  }
}

function colocarMinas() {
  minasColocadas = 0;
  while (minasColocadas < totalMinas) {
    var fila = Math.floor(Math.random() * filas);
    var col = Math.floor(Math.random() * columnas);

    if (!tablero[fila][col].mina) {
      tablero[fila][col].mina = true;
      minasColocadas++;
    }
  }
}

function contarMinasAlrededor() {
  for (var fila = 0; fila < filas; fila++) {
    for (var col = 0; col < columnas; col++) {
      if (tablero[fila][col].mina) {
        tablero[fila][col].minasAlrededor = -1;
        continue;
      }

      var minas = 0;
      for (var f = fila - 1; f <= fila + 1; f++) {
        for (var c = col - 1; c <= col + 1; c++) {
          if (
            f >= 0 && f < filas &&
            c >= 0 && c < columnas &&
            tablero[f][c].mina
          ) {
            minas++;
          }
        }
      }
      tablero[fila][col].minasAlrededor = minas;
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  crearTablero();
  colocarMinas();
  contarMinasAlrededor();
});
