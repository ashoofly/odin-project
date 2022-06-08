function removeAllChildren(parentElement) {
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }
}

function removeElement(element) {
  if (element.parentNode) {
    element.parentNode.removeChild(element);
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function createTableWithColumns(tableId, ...colNames) {
  const table = document.createElement('table');
  table.setAttribute('id', tableId);
  const thead = document.createElement('thead');
  const trowheader = document.createElement('tr');
  for (const colName of colNames) {
    let th = document.createElement('th');
    th.setAttribute('scope', 'col');
    th.textContent = colName;
    trowheader.appendChild(th);
  }
  thead.appendChild(trowheader);
  const tbody = document.createElement('tbody');
  table.appendChild(thead);
  table.appendChild(tbody);
  return table;
}

function addRowToTable(tableId, ...colValues) {
  const row = document.createElement('tr');
  for (const colVal of colValues) {
    let td = document.createElement('td');
    td.textContent = colVal;
    row.appendChild(td);
  }
  const tableBody = document.querySelector(`#${tableId} > tbody`)
  tableBody.appendChild(row);
  return tableBody;
}