$.ajax({
  url: 'http://127.0.0.1:1234/progresso',
  method: 'GET',
  success: function(response){
    var data = response.data;

    var progresso_bncc = data.map(function(item){
      return item.progresso;
    });

    document.getElementById('porcentagem').innerHTML = progresso_bncc[0]*10 + '%';

    
    
    grafico_progresso(progresso_bncc);
  
  },
  error: function(error) {
    console.log(error);
  }
})

function grafico_progresso(progresso_bncc){
  const ctx4 = document.getElementById('grafico_progresso').getContext('2d');

  new Chart(ctx4, {
    type: 'bar', 
    data: {
      labels: ['Percentage'],
      datasets: [
        {
          data: progresso_bncc,
          backgroundColor: progresso_bncc.map(nota => {
            if (nota >= 8) {
              return green;
            } else if (nota >= 5) {
              return yellow;
            } else {
              return red;
            }
          }),
          hoverBackgroundColor: progresso_bncc.map(nota => {
            if (nota >= 8) {
              return green;
            } else if (nota >= 5) {
              return yellow;
            } else {
              return red;
            }
          })
        },
        {
          data: [10 - progresso_bncc],
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