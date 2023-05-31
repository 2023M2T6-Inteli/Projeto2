// Get the canvas element
var ctx4 = document.getElementById('grafico_progresso').getContext('2d');

var nota_bncc = [20];
// Define the data
var data = {
  labels: ['Percentage'],
  datasets: [
    {
      data: nota_bncc,
      backgroundColor: nota_bncc.map(nota => {
        if (nota >= 80) {
          return 'rgb(67, 166, 51)';
        } else if (nota >= 50) {
          return 'rgb(242, 164, 19)';
        } else {
          return 'rgb(245, 83, 83)';
        }
      }),
      hoverBackgroundColor: nota_bncc.map(nota => {
        if (nota >= 80) {
          return 'rgb(67, 166, 51)';
        } else if (nota >= 50) {
          return 'rgb(242, 164, 19)';
        } else {
          return 'rgb(245, 83, 83)';
        }
      })
    },
    {
      data: [100 - nota_bncc],
      backgroundColor: '#D9D9D9',
      hoverBackgroundColor: '#D9D9D9',
    },
  ],
};

// Configure the options
var options = {
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'y', // Set the axis to display as horizontal
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
};

new Chart(ctx4, {
  type: 'bar', 
  data: data,
  options: options,
});

window.onload = function(){
    document.getElementById('porcentagem').innerHTML = nota_bncc + '%';
}