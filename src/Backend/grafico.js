const ctx = document.getElementById('myChart');
const ctx2 = document.getElementById('myChart2');

            const notaData = [32, 40, 42, 45, 47,
  48, 49, 50, 52, 53, 55, 56,
  58, 59, 60, 62, 63,
  65, 66, 68, 69, 70,
  72, 73, 74, 75, 76,
  77, 78,80, 81, 82, 83, 85,
  86, 87, 88, 89, 90,
  91, 92, 93, 94, 95,
  96, 97, 98, 99, 100
            ];

            const alunoData = [
            'Student 1', 'Student 2', 'Student 3', 'Student 4', 'Student 5',
            'Student 6', 'Student 7', 'Student 8', 'Student 9', 'Student 10',
            'Student 11', 'Student 12', 'Student 13', 'Student 14', 'Student 15',
            'Student 16', 'Student 17', 'Student 18', 'Student 19', 'Student 20',
            'Student 21', 'Student 22', 'Student 23', 'Student 24', 'Student 25',
            'Student 26', 'Student 27', 'Student 28', 'Student 29', 'Student 30',
            'Student 31', 'Student 32', 'Student 33', 'Student 34', 'Student 35',
            'Student 36', 'Student 37', 'Student 38', 'Student 39', 'Student 40'
            ];

            const notasSala = [12, 28, 41, 56, 62, 75, 81, 92, 97, 100];
            const datas = ["01/01", "01/02", "01/03", "01/04", "01/05", "01/06", "01/07", "01/08", "01/09", "01/10"];



          
            new Chart(ctx, {
              type: 'bar',
              data: {
                labels: alunoData,
                datasets: [{
                  label: 'Notas dos alunos',
                  data: notaData,
                  borderwidth: 1,
                  
                  backgroundColor: notaData.map(nota =>{
                    if (nota >= 80){
                        return 'rgb(67,166,51)';
                    }
                    else if(nota < 80 && nota >= 50){
                        return 'rgb(242,164,19)';
                    }
                    else{
                        return 'rgb(245,83,83)';
                    }
                  }),
                hoverBackgroundColor: notaData.map(nota =>{
                    if (nota >= 80){
                        return 'rgb(93, 206, 76)';
                    }
                    else if(nota < 80 && nota >= 50){
                        return 'rgb(255, 201, 4)';
                    }
                    else{
                        return 'rgb(255, 103, 103)';
                    }
                  })

                  
                }]
              },
              options: {
                responsive: true,
                mantainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true
                  },
                  x: {
                    ticks: {
                      display: false
                  },
                    xAxes: [{
                        gridLines: {
                            drawBorder: true,
                            display: false

                    },
                    yAxes: [{
                        gridLines: {
                            drawBorder: true,
                            display: false
                        }
                    }]
                  }]
                  }
                }
              }
            });
        
            new Chart(ctx2, {
                type: 'line',
                data: {
                  labels: datas,
                  datasets: [{
                    label: 'Notas da sala',
                    data: notasSala,
                    borderwidth: 1,
                    pointBackgroundColor: 'rgb(61, 198, 196)',
                    pointBorderWidth: 6,
                    pointBorderColor: 'rgb(61, 198, 196)',
                    
                  }]
                },
                options: {
                responsive: true,
                mantainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true
                  },
                  x: {
                    ticks: {
                      display: false
                  },
                    xAxes: [{
                        gridLines: {
                            drawBorder: true,
                            display: false

                    },
                    yAxes: [{
                        gridLines: {
                            drawBorder: true,
                            display: false
                        }
                    }]
                  }]
                  }
                }
              }
            })
            