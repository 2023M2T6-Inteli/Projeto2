function calcularMedia() {
    // Obtém a tabela e as linhas com a classe "valor"
    var table = document.getElementById("notas");
    var rows = table.getElementsByClassName("valor");
  
    // Obtém o número de questões
    var numQuestoes = table.rows[0].childElementCount - 5; // Descontando as células não relacionadas às questões
  
    // Itera sobre as linhas
    for (var i = 0; i < rows.length - 1; i++) {
      var row = rows[i];
      var cells = row.getElementsByTagName("td"); // Obtém as células da linha
      var total = parseInt(cells[cells.length - 2].innerText); // Obtém o valor total da célula como um número inteiro
  
      // Calcula a média
      var media = total / numQuestoes;
  
      // Define a média na célula da coluna "Média"
      cells[cells.length - 1].innerText = media.toFixed(2); // Arredonda para 2 casas decimais
    }
  }
  