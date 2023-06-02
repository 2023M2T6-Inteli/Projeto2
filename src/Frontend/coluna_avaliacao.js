function addColumn() {
    var table = document.getElementById("notas");
    
    var headerRow = table.querySelector(".questão");
    var newHeaderCell = document.createElement("th");
    newHeaderCell.innerHTML = '<button class="q"> Q' + (headerRow.children.length - 2) + '</button>';
    headerRow.insertBefore(newHeaderCell, headerRow.lastElementChild);
    
    var rows = table.querySelectorAll(".valor");
    rows.forEach(function(row) {
      var newCell = document.createElement("td");
      newCell.contentEditable = true;
      row.insertBefore(newCell, row.lastElementChild);
    });
  }
  
  
  
  