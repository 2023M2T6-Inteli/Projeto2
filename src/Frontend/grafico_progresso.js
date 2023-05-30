const value = 57866;
const max = 80000;

const ctx4 = document.getElementById('grafico_progresso');

new Chart(ctx4, {
  type: 'horizontalBar',
  data: {
    labels: [],
    datasets: [{
      data: [value],
      backgroundColor: "rgba(51,230,125,1)"
    }, {
      data: [max - value],
      backgroundColor: "lightgrey",
    }, ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: true
    },
    tooltips: {
      enabled: false
    },
    scales: {
      xAxes: [{
        display: false,
        stacked: true
      }],
      yAxes: [{
        display: false,
        stacked: true
      }],
    } 
  } 
});
