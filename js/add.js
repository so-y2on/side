var selectedRow = null;

const baseUrl = 'http://chifuyu74.shop/post';

// api를 만들어주면 서버 폴더로 가서 git pull 명령어를 터미널에 입력해주고 yarn dev 입력

function readPostList() {
  var lists = fetch(`${baseUrl}/post`, {
    method: 'GET',
  }).then((res) => res.json());

  var table = document.getElementById(''); // 테이블을 변수에 담아서
  /*
   테이블에 
   <tr>
    <td>제목 값</td>
    <td>작성자 값</td>
    <td>내용 값</td>
   </tr>

   를 하나씩 더하던지 or 한번에 모두 더하던지

   ↓ 처음에 이 함수를 호출하면 목록이 불러와진다 (done)
   */
}

readPostList();

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
  cell3 = newRow.insertCell(3);
  cell3.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                     <a onClick="onDelete(this)">Delete</a>`;
  cell3.innerHTML = `<a onClick="onEdit(this)">수정</a>
                     <a onClick="onDelete(this)">삭제</a>`;

  var result = fetch(`${baseUrl}/add`, {
    method: 'POST',
    body: {
      title: data.title,
      writer: data.writer,
      content: data.content,
    },
  }).then((res) => res.json());
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

/*
GET => 

*/
