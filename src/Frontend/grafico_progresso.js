const axios = require('axios');

axios.get('nota_bncc') // MUDAR - retorna média da turma em relação aos critérios da BNCC
  .then(response =>{

    var nota_bncc = response.data;

    grafico_progresso(nota_bncc);
  })
  .catch(error => {
    console.error(error);
  });


function grafico_progresso(nota_bncc){

  const ctx4 = document.getElementById('grafico_progresso').getContext('2d');
  
  new Chart(ctx4, {
    type: 'bar', 
    data: {
      labels: ['Percentage'],
      datasets: [
        {
          data: nota_bncc,
          backgroundColor: nota_bncc.map(nota => {
            if (nota >= 80) {
              return green;
            } else if (nota >= 50) {
              return yellow;
            } else {
              return red;
            }
          }),
          hoverBackgroundColor: nota_bncc.map(nota => {
            if (nota >= 80) {
              return green;
            } else if (nota >= 50) {
              return yellow;
            } else {
              return red;
            }
          })
        },
        {
          data: [100 - nota_bncc],
          backgroundColor: '#D9D9D9',
          hoverBackgroundColor: '#D9D9D9',
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y', 
      scales: {
        x: {
          display: false,
          stacked: true,
        },
        y: {
          display: false,
          stacked: true,
        },
      },
      plugins: {
        legend: {
          display: false,
        }
      }
    }
  });
}

window.onload = function(){
    document.getElementById('porcentagem').innerHTML = nota_bncc + '%';
}