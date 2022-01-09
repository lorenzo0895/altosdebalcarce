function desplegable(id) {
  let ul = document.getElementById(id);
  let oculto = !(ul.style.display === "flex");

  if (oculto) {
    ul.style.display = "flex";
  } else {
    ul.style.display = "none";
  }
}
