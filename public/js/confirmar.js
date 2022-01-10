function abrir(id_form) {
  let body = document.getElementsByTagName('body')[0];
  let blur = document.getElementById('blur');
  let botonConfirmar = document.getElementById('botonConfirmar');
  
  
  body.style.overflow = 'hidden';
  blur.style.display = 'flex';
  botonConfirmar.setAttribute('onclick',`confirmar(${id_form})`);
  
}

function cerrar() {
  let body = document.getElementsByTagName('body')[0];
  let blur = document.getElementById('blur');
  
  body.style.overflow = 'auto';
  blur.style.display = 'none';  
}

function confirmar (id_form) {
  let form = document.getElementById(id_form);
  form.submit();
}