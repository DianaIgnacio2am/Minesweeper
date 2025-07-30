"use strict";

// Referencias al DOM
var formulario = document.getElementById("formularioJugador");
var inputNombre = document.getElementById("nombreJugador");
var errorNombre = document.getElementById("errorNombre");

// Validación del nombre (mínimo 3 letras)
formulario.addEventListener("submit", validarNombre);

function validarNombre(evento) {
  evento.preventDefault();

  var nombre = inputNombre.value.trim();

  if (nombre.length < 3) {
    errorNombre.textContent = "El nombre debe tener al menos 3 letras.";
    return;
  }

  // Limpia error y guarda el nombre en LocalStorage
  errorNombre.textContent = "";
  localStorage.setItem("jugador", nombre);

  // Redirige a la pantalla del juego (a crear)
  window.location.href = "juego.html";
}
