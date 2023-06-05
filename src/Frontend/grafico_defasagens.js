/* axios.get('/habilidades_defasagens') // MUDAR - retorna as 5 habilidades com maior defasagem
.then(response => {
     var habilidades_defasagens = response.data;

     axios.get('/habilidades_defasagens_nome') // MUDAR - retorna o nome das 5 habilidades
       .then(response => {
         var habilidades_defasagens_nome = response.data;

         grafico_turma(habilidades_defasagens, habilidades_defasagens_nome);
       })
       .catch(error => {
         console.log(error);
       });
   })
   .catch(error => {
     console.log(error);
   });

/*gráficos de defasagens da turma feito com chart.js*/
function grafico_turma(habilidades_defasagens, habilidades_defasagens_nome){

  const ctx3 = document.getElementById('grafico_defasagens')

  new Chart (ctx3, {
      type: 'pie',
      data: {
          labels: habilidades_defasagens_nome,
          datasets: [{
              label: 'Maiores defasagens da turma',
              data: habilidades_defasagens,
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
}