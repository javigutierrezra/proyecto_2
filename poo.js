// Clase Encuesta
class Encuesta {
  constructor(pregunta, opciones) {
    this.pregunta = pregunta;
    this.opciones = opciones.map(op => ({ nombre: op, votos: 0 }));
  }

  votar(opcionIndex) {
    if (this.opciones[opcionIndex]) {
      this.opciones[opcionIndex].votos++;
    }
  }

  mostrarResultados() {
    return this.opciones.map(op => `${op.nombre}: ${op.votos} votos`).join('<br>');
  }
}

// Clase Administrador de Encuestas
class EncuestaManager {
  constructor() {
    this.encuestas = [];
  }

  agregarEncuesta(encuesta) {
    this.encuestas.push(encuesta);
  }

  mostrarEncuestas() {
    const div = document.getElementById('encuestas');
    div.innerHTML = '';
    this.encuestas.forEach((enc, i) => {
      const encDiv = document.createElement('div');
      encDiv.innerHTML = `<h3>${enc.pregunta}</h3>`;
      enc.opciones.forEach((op, idx) => {
        const btn = document.createElement('button');
        btn.textContent = `${op.nombre} (${op.votos})`;
        btn.onclick = () => {
          enc.votar(idx);
          encDiv.innerHTML = `<h3>${enc.pregunta}</h3>${enc.mostrarResultados()}`;
        };
        encDiv.appendChild(btn);
      });
      div.appendChild(encDiv);
    });
  }
}

const manager = new EncuestaManager();

// Crear encuesta desde el HTML
document.getElementById('crearEncuesta').addEventListener('click', () => {
  const pregunta = document.getElementById('pregunta').value;
  const opciones = document.getElementById('opciones').value.split(',');
  if(pregunta && opciones.length >= 2) {
    const encuesta = new Encuesta(pregunta, opciones);
    manager.agregarEncuesta(encuesta);
    manager.mostrarEncuestas();
  } else {
    alert('Ingresa una pregunta y al menos dos opciones');
  }
});
