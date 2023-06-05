$.ajax({
  url: 'http://127.0.0.1:3000/defasagens',
  method: 'GET',
  success: function (response) {

    var data = response.data;

    var habilidades_defasagens_num_alunos = data.map(function (item) {
      return item.num_alunos;
    });

    var habilidades_defasagens_nome = data.map(function (item) {
      return item.tipo_habilidade;
    });

    const ctx3 = document.getElementById('grafico_defasagens')

  new Chart (ctx3, {
      type: 'pie',
      data: {
          labels: habilidades_defasagens_nome,
          datasets: [{
              label: 'Maiores defasagens da turma',
              data: habilidades_defasagens_num_alunos,
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
  
  },
  error: function (err) {
    console.log(err);
  }
});

