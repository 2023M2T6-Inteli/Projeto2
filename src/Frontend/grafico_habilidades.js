const ctx2 = document.getElementById('grafico_habilidades');
const nota2 = [10, 40, 43, 60, 64, 75, 42, 31, 78, 94, 100, 54, 57];
const habilidades = ['EF05MA1', 'EF05MA2', 'EF05MA3', 'EF05MA4', 'EF05MA5', 'EF05MA6', 'EF05MA7', 'EF05MA8', 'EF05MA9', 'EF05MA10', 'EF05MA11', 'EF05MA12', 'EF05MA13'];

new Chart(ctx2, {
  type: 'bar',
  data: {
    labels: habilidades,
    datasets: [{
      label: '',
      data: nota2,
      borderWidth: 1,
      backgroundColor: nota2.map(nota => {
        if (nota >= 80) {
          return green;
        } else if (nota >= 50) {
          return yellow;
        } else {
          return red;
        }
      }),
      hoverBackgroundColor: nota2.map(nota => {
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
