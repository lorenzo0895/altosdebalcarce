function agregar(dia) {
  let tbody = document.getElementById(dia);
  let tr = document.createElement('tr');
  let img = document.createElement('img');
  let desde = document.createElement('input');
  let hasta = document.createElement('input');
  let cupo = document.createElement('input');
  const random = Math.random();
  tr.id = random;
  img.src = '/images/dash-circle.svg';
  img.onclick = 'sacar(random)';
  img.setAttribute("onclick",`sacar(${random})`);
  img.className ='manito';
  desde.className = 'form-control';
  hasta.className = 'form-control';
  cupo.className = 'form-control';
  desde.type = 'time';
  hasta.type = 'time';
  cupo.type = 'number';
  desde.required = true;
  hasta.required = true;
  cupo.required = true;
  desde.name = 'desde'+ dia;
  hasta.name = 'hasta'+ dia;
  cupo.name = 'cupo'+ dia;
  let td1 = document.createElement('td');
  let td2 = document.createElement('td');
  let td3 = document.createElement('td');
  let td4 = document.createElement('td');
  td1.appendChild(img);
  td2.appendChild(desde);
  td3.appendChild(hasta);
  td4.appendChild(cupo);
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tbody.appendChild(tr);
}
function sacar (id) {
  let tr = document.getElementById(id);
  tr.remove();
}