document.addEventListener('DOMContentLoaded', function() {
  var form = document.getElementById('contactForm');
  var errorNombre = document.getElementById('errorNombre');
  var errorEmail = document.getElementById('errorEmail');
  var errorMensaje = document.getElementById('errorMensaje');

  function validarNombre(nombre) {
    var regex = /^[a-zA-Z0-9\s]+$/;
    return regex.test(nombre.trim()) && nombre.trim().length > 0;
  }
  
window.addEventListener("DOMContentLoaded", function () {
  var modoGuardado = localStorage.getItem("modo");

  if (modoGuardado === "oscuro") {
    document.body.classList.add("modo-oscuro");
  } else {
    document.body.classList.remove("modo-oscuro");
  }
});

  function validarEmail(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email.trim());
  }

  function validarMensaje(mensaje) {
    return mensaje.trim().length > 5;
  }

  function limpiarErrores() {
    errorNombre.textContent = '';
    errorEmail.textContent = '';
    errorMensaje.textContent = '';
  }

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    limpiarErrores();

    var nombreVal = form.nombre.value;
    var emailVal = form.email.value;
    var mensajeVal = form.mensaje.value;

    var formValido = true;

    if (!validarNombre(nombreVal)) {
      errorNombre.textContent = 'El nombre debe ser alfanumérico y no puede estar vacío.';
      formValido = false;
    }

    if (!validarEmail(emailVal)) {
      errorEmail.textContent = 'Por favor, ingresa un correo válido.';
      formValido = false;
    }

    if (!validarMensaje(mensajeVal)) {
      errorMensaje.textContent = 'El mensaje debe tener más de 5 caracteres.';
      formValido = false;
    }

    if (!formValido) {
      return;
    }

    var asunto = encodeURIComponent('Contacto desde formulario web');
    var cuerpo = encodeURIComponent(
      'Nombre: ' + nombreVal + '\nCorreo: ' + emailVal + '\n\nMensaje:\n' + mensajeVal
    );

    window.location.href = 'mailto:?subject=' + asunto + '&body=' + cuerpo;
  });
});
