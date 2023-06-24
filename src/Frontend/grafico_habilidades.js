$.ajax({
  url: 'http://127.0.0.1:1234/medias_habilidade',
  method: 'GET',

  success: function(response) {
    var data = response.data;

    var habilidades_nota = data.map(function(item) {
      return item.media_habilidade;
    });

    console.log(habilidades_nota)

    var habilidades_nome = data.map(function(item) {
      return item.tipo_habilidade;
    });

    console.log(habilidades_nome)

    grafico_habilidades(habilidades_nome, habilidades_nota);
    
  },
  error: function(error) {
    console.log(error);
  }
})

function grafico_habilidades(habilidades_nome, habilidades_nota){
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
          if (nota >= 8) {
            return green;
          } else if (nota >= 5) {
            return yellow;
          } else {
            return red;
          }
        }),
        hoverBackgroundColor: habilidades_nota.map(nota => {
          if (nota >= 8) {
            return green;
          } else if (nota >= 5) {
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
