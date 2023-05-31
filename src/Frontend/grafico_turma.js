const axios = require('axios');

const green = '#43A633';
const yellow = '#F2A413';
const red = '#F55353';

axios.get('turma_nota') // MUDAR - retorna média da turma por data
  .then(response => {
    var turma_nota = response.data;

    axios.get('turma_nota_data') // MUDAR - retorna data que a média foi registrada
      .then(response => {
        var turma_nota_data = response.data;

        grafico_turma(turma_nota_data, turma_nota);
      })
      .catch(error => {
        console.log(error);
      });
  })
  .catch(error => {
    console.log(error);
  });

function grafico_turma(turma_nota_data, turma_nota){

  const ctx1 = document.getElementById('grafico_turma');
  
  new Chart(ctx1, {
    type: 'line',
    data: {
      labels: turma_nota_data,
      datasets: [{
        label: '',
        data: turma_nota,
        borderWidth: 1,
        pointBackgroundColor: turma_nota.map(nota => {
          if (nota >= 80) {
            return green;
          } else if (nota >= 50) {
            return yellow;
          } else {
            return red;
          }
        }),
        borderWidth: 2,
        borderColor: 'rgb(0,0,0)',
        pointBorderWidth: 6,
        pointBorderColor: turma_nota.map(nota => {
          if (nota >= 80) {
            return green;
          } else if (nota >= 50) {
            return yellow;
          } else {
            return red;
          }
        })
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        },
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
