function calcularMedia(colIndex) {
    var table = document.getElementById("notas");
    var rows = table.querySelectorAll(".valor");
    var sum = 0;
    var count = 0;
    
    rows.forEach(function(row) {
      var cell = row.cells[colIndex];
      var value = parseFloat(cell.textContent.trim());
      
      if (!isNaN(value)) {
        sum += value;
        count++;
      }
    });
    
    var media = sum / count;
    return media.toFixed(2); // Arredondar para 2 casas decimais
  }