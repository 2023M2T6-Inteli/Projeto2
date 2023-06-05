
  
function addColumn() {
    var table = document.getElementById("notas");
    var rows = table.getElementsByTagName("tr");

    // Atualiza o cabeçalho
    var headerRow = rows[0];
    var newHeaderCell = document.createElement("th");
    newHeaderCell.innerHTML = "<button class='q'> Q" + (headerRow.childElementCount - 2) + " </button>";
    headerRow.insertBefore(newHeaderCell, headerRow.children[headerRow.childElementCount - 2]);

    // Atualiza as células das linhas
    for (var i = 1; i < rows.length - 1; i++) {
      var valueRow = rows[i];
      var newCell = document.createElement("td");
      newCell.contentEditable = "true";
      valueRow.insertBefore(newCell, valueRow.children[valueRow.childElementCount - 2]);
    }
  }

  