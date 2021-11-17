var selectedRow = null;

const u = 'http://chifuyu74.shop/post';

async function onList() {
  var res = await fetch(`${u}`, { method: 'GET' }).then((res) => res.json());

  var posts = res.list;
}

onList();

function onFormSubmit() {
  // alert("dddd");
  var formData = readFormData();
  if (selectedRow == null) insertNewRecord(formData);
  else updateRecord(formData);
  resetForm();
}
function readFormData() {
  var formData = {};
  formData['title'] = document.getElementById('title').value;
  formData['writer'] = document.getElementById('writer').value;
  formData['content'] = document.getElementById('content').value;
  return formData;
}
function insertNewRecord(data) {
  var table = document.getElementById('listAll').getElementsByTagName('tbody')[0];
  var newRow = table.insertRow(table.length);
  cell1 = newRow.insertCell(0);
  cell1.innerHTML = data.title;
  cell2 = newRow.insertCell(1);
  cell2.innerHTML = data.writer;
  cell3 = newRow.insertCell(2);
  cell3.innerHTML = data.content;
  cell4 = newRow.insertCell(3);
  /*  cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                     <a onClick="onDelete(this)">Delete</a>`; */
  cell4.innerHTML = `<a onClick="onEdit(this)">수정</a>
                     <a onClick="onDelete(this)">삭제</a>`;
}
function resetForm() {
  document.getElementById('title').value = '';
  document.getElementById('writer').value = '';
  document.getElementById('content').value = '';
  selectedRow = null;
}
function onEdit(td) {
  selectedRow = td.parentElement.parentElement;
  document.getElementById('title').value = selectedRow.cells[0].innerHTML;
  document.getElementById('writer').value = selectedRow.cells[1].innerHTML;
  document.getElementById('content').value = selectedRow.cells[2].innerHTML;
}
function updateRecord(formData) {
  selectedRow.cells[0].innerHTML = formData.title;
  selectedRow.cells[1].innerHTML = formData.writer;
  selectedRow.cells[2].innerHTML = formData.content;
}
function onDelete(td) {
  if (confirm('정말 삭제하시겠습니까?')) {
    row = td.parentElement.parentElement;
    document.getElementById('listAll').deleteRow(row.rowIndex);
    resetForm();
  }
}
