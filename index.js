let encuestas = [];

// Función para crear encuesta
const crearEncuesta = (pregunta, opciones) => {
  return {
    pregunta,
    opciones: opciones.map(op => ({ nombre: op, votos: 0 }))
  };
};

// Función para votar
const votar = (encuestaIndex, opcionIndex) => {
  encuestas = encuestas.map((enc, i) => 
    i === encuestaIndex
      ? { ...enc, opciones: enc.opciones.map((op, idx) => 
          idx === opcionIndex ? { ...op, votos: op.votos + 1 } : op
        )}
      : enc
  );
  mostrarEncuestas();
};

// Función para mostrar resultados
const mostrarEncuestas = () => {
  const div = document.getElementById('encuestas');
  div.innerHTML = '';
  encuestas.forEach((enc, i) => {
    const encDiv = document.createElement('div');
    encDiv.innerHTML = `<h3>${enc.pregunta}</h3>`;
    enc.opciones.forEach((op, idx) => {
      const btn = document.createElement('button');
      btn.textContent = `${op.nombre} (${op.votos})`;
      btn.onclick = () => votar(i, idx);
      encDiv.appendChild(btn);
    });
    div.appendChild(encDiv);
  });
};

// Evento para crear encuesta desde HTML
document.getElementById('crearEncuesta').addEventListener('click', () => {
  const pregunta = document.getElementById('pregunta').value;
  const opciones = document.getElementById('opciones').value.split(',');
  if (pregunta && opciones.length >= 2) {
    encuestas = [...encuestas, crearEncuesta(pregunta, opciones)];
    mostrarEncuestas();
  } else {
    alert('Ingresa una pregunta y al menos dos opciones');
  }
});