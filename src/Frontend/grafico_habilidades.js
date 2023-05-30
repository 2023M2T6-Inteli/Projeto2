const ctx2 = document.getElementById('grafico_habilidades');
const nota2 = [10, 40, 60, 80, 90];
const habilidades = ['H1', 'H2', 'H3', 'H4', 'H5'];

new Chart(ctx2, {
  type: 'bar',
  data: {
    labels: habilidades,
    datasets: [{
      label: 'Média por habilidade',
      data: nota2,
      borderWidth: 1,
      backgroundColor: nota2.map(nota => {
        if (nota >= 80) {
          return 'rgb(67, 166, 51)';
        } else if (nota >= 50) {
          return 'rgb(242, 164, 19)';
        } else {
          return 'rgb(245, 83, 83)';
        }
      }),
      hoverBackgroundColor: nota2.map(nota => {
        if (nota >= 80) {
          return 'rgb(93, 206, 76)';
        } else if (nota >= 50) {
          return 'rgb(255, 201, 4)';
        } else {
          return 'rgb(255, 103, 103)';
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
