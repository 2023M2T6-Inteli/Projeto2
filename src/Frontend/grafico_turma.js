const ctx1 = document.getElementById('grafico_turma');
const nota1 = [12, 28, 41, 56, 62, 75, 81, 92, 97, 100];
const datas = ["01/01", "01/02", "01/03", "01/04", "01/05", "01/06", "01/07", "01/08", "01/09", "01/10"];

new Chart(ctx1, {
  type: 'line',
  data: {
    labels: datas,
    datasets: [{
      label: 'Notas da sala',
      data: nota1,
      borderWidth: 1,
      pointBackgroundColor: nota1.map(nota => {
        if (nota >= 80) {
          return 'rgb(67, 166, 51)';
        } else if (nota >= 50) {
          return 'rgb(242, 164, 19)';
        } else {
          return 'rgb(245, 83, 83)';
        }
      }),
      borderWidth: 2,
      borderColor: 'rgb(0,0,0)',
      pointBorderWidth: 6,
      pointBorderColor: nota1.map(nota => {
        if (nota >= 80) {
          return 'rgb(67, 166, 51)';
        } else if (nota >= 50) {
          return 'rgb(242, 164, 19)';
        } else {
          return 'rgb(245, 83, 83)';
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
