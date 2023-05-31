const axios = require('axios');

axios.get('endpoint_habilidades_nota') // MUDAR - retorna média de notas da sala por habilidade
  .then(response => {
    var habilidades_nota = response.data;

    axios.get('endpoint_habilidades_nome') // MUDAR - retorna nome das habilidades BNCC
      .then(response => {
        var habilidades_nome = response.data;

        grafico_turma(habilidades_nome, habilidades_nota);
      })
      .catch(error => {
        console.log(error);
      });
  })
  .catch(error => {
    console.log(error);
  });

function grafico_turma(habilidades_nome, habilidades_nota) {
  const ctx2 = document.getElementById('grafico_habilidades');

  new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: habilidades_nome,
      datasets: [{
        label: '',
        data: habilidades_nota,
        borderWidth: 1,
        backgroundColor: habilidades_nota.map(nota => {
          if (nota >= 80) {
            return 'green';
          } else if (nota >= 50) {
            return 'yellow';
          } else {
            return 'red';
          }
        }),
        hoverBackgroundColor: habilidades_nota.map(nota => {
          if (nota >= 80) {
            return 'green';
          } else if (nota >= 50) {
            return 'yellow';
          } else {
            return 'red';
          }
        })
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
        x: {
          grid: {
            display: false
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            boxWidth: 0
          }
        }
      }
    }
  });
}
