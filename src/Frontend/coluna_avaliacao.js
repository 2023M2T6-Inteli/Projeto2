function addColumn() {
    var table = document.getElementById("notas"); // Obtém a referência para a tabela com o id "notas"
    
    var headerRow = table.querySelector(".questão"); // Obtém a linha de cabeçalho com a classe "questão"
    var newHeaderCell = document.createElement("th"); // Cria uma nova célula de cabeçalho
    newHeaderCell.innerHTML = '<button class="q"> Q' + (headerRow.children.length - 2) + '</button>'; // Define o conteúdo HTML da nova célula de cabeçalho
    headerRow.insertBefore(newHeaderCell, headerRow.lastElementChild); // Insere a nova célula de cabeçalho antes da última célula
    
    var rows = table.querySelectorAll(".valor"); // Obtém todas as linhas com a classe "valor"
    rows.forEach(function(row) {
      var newCell = document.createElement("td"); // Cria uma nova célula
      newCell.contentEditable = true; // Torna a célula editável
      row.insertBefore(newCell, row.lastElementChild); // Insere a nova célula antes da última célula na linha
    });
}

  
  