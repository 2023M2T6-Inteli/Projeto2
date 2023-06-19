function searchAluno() {
    var input = document.getElementById("buscar").value.toLowerCase();
    var results = document.getElementById("searchResults");
    results.innerHTML = ""; // Limpar os resultados anteriores
  
    fetch('http://127.0.0.1:3000/aluno')
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        var alunos = data;
        
  
        alunos.data.forEach(function(aluno) {
          if (aluno.nome_aluno.toLowerCase().indexOf(input) !== -1) {

            console.log(aluno.nome_aluno.toLowerCase())
            // Criar um elemento para exibir o resultado
            var resultElement = document.createElement("div");
            resultElement.classList.add("result");

            resultElement.addEventListener('click',handleClick(aluno.id_aluno));

            
            // Preencher o conteúdo do resultado
            var info = `
            <h3>${aluno.nome_aluno}</h3>
            `;
            
            let  conteudoNovo = document.createTextNode(aluno.nome_aluno);
            resultElement.appendChild(conteudoNovo)
  
            // Adicionar o resultado à lista de resultados
            results.appendChild(resultElement);
          }
        });
      })
      .catch(function(error) {
        console.log('Ocorreu um erro:', error);
      });
  }
  
  // Evento de digitação na barra de pesquisa
  document.getElementById("buscar").addEventListener("keyup", searchAluno);
  