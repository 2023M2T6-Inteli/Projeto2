

function calcularTotal() {
  // Obtém a tabela e as linhas com a classe "valor"
  var table = document.getElementById("notas");
  var rows = table.getElementsByClassName("valor");

  // Itera sobre as linhas
  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    var cells = row.getElementsByTagName("td"); // Obtém as células da linha
    var total = 0;

    // Itera sobre as células preenchíveis (exceto a última 3 colunas)
    for (var j = 1; j < cells.length - 3; j++) {
      var cellValue = parseInt(cells[j].innerText); // Obtém o valor da célula como um número inteiro

      // Verifica se o valor é um número válido
      if (!isNaN(cellValue)) {
        total += cellValue; // Soma o valor ao total
      }
    }

    cells[cells.length - 2].innerText = total; // Define o total na célula da coluna "Total"
  }
}

