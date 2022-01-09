
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('alert')) {
  let alert = document.getElementById('alert');
  alert.style.display = 'block';
  alert.innerHTML = urlParams.get('alert');
}
if (urlParams.has('msj')) {
  let msj = document.getElementById('msj');
  msj.style.display = 'block';
  msj.innerHTML = urlParams.get('msj');
}