const green = '#43A633';
const yellow = '#F2A413';
const red = '#F55353';

$.ajax({
  url: 'http://127.0.0.1:3000/medias/1',
  method: 'GET',
  success: function(response) {
    var data = response.data;

    var medias = data.map(function(item) {
      return item.media_notas;
    });

    var datas = data.map(function(item) {
      return item.data;
    });

    const ctx1 = document.getElementById('grafico_turma');
  
    new Chart(ctx1, {
      type: 'line',
      data: {
        labels: datas,
        datasets: [{
          label: '',
          data: medias,
          borderWidth: 1,
          pointBackgroundColor: medias.map(nota => {
            if (nota >= 8) {
              return green;
            } else if (nota >= 5) {
              return yellow;
            } else {
              return red;
            }
          }),
          borderWidth: 2,
          borderColor: 'rgb(0,0,0)',
          pointBorderWidth: 6,
          pointBorderColor: medias.map(nota => {
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
              display: true
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
});


  

