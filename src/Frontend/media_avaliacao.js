function calcularMedia(colIndex) {
    var table = document.getElementById("notas"); // Obtém a referência para a tabela com o id "notas"
    var rows = table.querySelectorAll(".valor"); // Obtém todas as linhas com a classe "valor"
    var sum = 0; // Variável para armazenar a soma dos valores
    var count = 0; // Variável para contar o número de valores
    
    rows.forEach(function(row) {
      var cell = row.cells[colIndex]; // Obtém a célula na coluna especificada pelo índice
      var value = parseFloat(cell.textContent.trim()); // Obtém o valor da célula convertendo para um número de ponto flutuante
      
      if (!isNaN(value)) { // Verifica se o valor é um número válido
        sum += value; // Adiciona o valor à soma
        count++; // Incrementa o contador
      }
    });
    
    var media = sum / count; // Calcula a média
    return media.toFixed(2); // Retorna a média arredondada para 2 casas decimais
}
