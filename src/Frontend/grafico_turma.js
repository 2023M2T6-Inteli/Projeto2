const ctx1 = document.getElementById('grafico_turma');
const nota1 = [12, 28, 41, 56, 62, 75, 81, 92, 97, 100];
const datas = ["01/01", "01/02", "01/03", "01/04", "01/05", "01/06", "01/07", "01/08", "01/09", "01/10"];

const green = '#43A633';
const yellow = '#F2A413';
const red = '#F55353';

new Chart(ctx1, {
  type: 'line',
  data: {
    labels: datas,
    datasets: [{
      label: '',
      data: nota1,
      borderWidth: 1,
      pointBackgroundColor: nota1.map(nota => {
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
      pointBorderColor: nota1.map(nota => {
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
