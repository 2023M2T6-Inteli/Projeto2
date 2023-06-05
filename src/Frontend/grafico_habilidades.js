$.ajax({
  url: 'http://127.0.0.1:3000/medias_habilidades',
  method: 'GET',

  success: function(response) {
    var data = response.data;

    var habilidades_nota = data.map(function(item) {
      return item.media_habilidade;
    });

    console.log(green)
    var habilidades_nome = data.map(function(item) {
      return item.tipo_habilidade;
    });

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
  },
  error: function(error) {
    console.log(error);
  }
})


