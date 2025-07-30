document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const errorNombre = document.getElementById('errorNombre');
  const errorEmail = document.getElementById('errorEmail');
  const errorMensaje = document.getElementById('errorMensaje');

  function validarNombre(nombre) {
    const regex = /^[a-zA-Z0-9\s]+$/;
    return regex.test(nombre.trim()) && nombre.trim().length > 0;
  }

  function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    limpiarErrores();

    const nombreVal = form.nombre.value;
    const emailVal = form.email.value;
    const mensajeVal = form.mensaje.value;

    let formValido = true;

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

    const asunto = encodeURIComponent('Contacto desde formulario web');
    const cuerpo = encodeURIComponent(
      `Nombre: ${nombreVal}\nCorreo: ${emailVal}\n\nMensaje:\n${mensajeVal}`
    );

    window.location.href = `mailto:?subject=${asunto}&body=${cuerpo}`;
  });
});
