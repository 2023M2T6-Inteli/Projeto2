const ctx3 = document.getElementById('grafico_defasagens')

const numero_alunos = [20,25,32]
const habilidades_defasagens = ['EF05MA12', 'EF05MA06', 'EF05MA24']

new Chart (ctx3, {
    type: 'pie',
    data: {
        labels: habilidades_defasagens,
        datasets: [{
            label: 'Maiores defasagens da turma',
            data: numero_alunos,
            borderWidth: 0
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
            labels: {
              boxWidth: 0
            }
        },
        },
      }
});