"use strict";

// Referencias al DOM
var formulario = document.getElementById("formularioJugador");
var inputNombre = document.getElementById("nombreJugador");
var errorNombre = document.getElementById("errorNombre");

// Validación del nombre (mínimo 3 letras)
formulario.onsubmit = function(evento) {
  if (evento && evento.preventDefault) {
    evento.preventDefault();
  } else {
    window.event.returnValue = false; // compatibilidad IE8
  }

  var nombre = inputNombre.value;
  nombre = nombre.replace(/^\s+|\s+$/g, ""); // reemplazo de trim()

  if (nombre.length < 3) {
    errorNombre.innerHTML = "El nombre debe tener al menos 3 letras.";
    return false;
  }

  // Limpia error y guarda el nombre en LocalStorage
  errorNombre.innerHTML = "";
  localStorage.setItem("jugador", nombre);

  // Redirige a la pantalla del juego
  window.location.href = "juego.html";
};
