var selectedRow = null;

const u = 'http://chifuyu74.shop/post';

var globals = {};

function onRead(postId) {
  var currentPost = globals[postId];
  var currentH1 = document.querySelector('.title');
  console.log(currentH1, currentPost);
  currentH1.textContent = currentPost.title;

  var currentUpdated = document.querySelector('p.updatedAt');
  currentUpdated.innerHTML = currentPost.updatedAt;

  var currentContent = document.querySelector('p.content');
  currentContent.innerHTML = currentPost.content;

  var del = document.getElementById('del');
  del.style.display = 'block';
  del.addEventListener('click', async function () {
    if (confirm('정말 삭제하시겠습니까?')) {
      var d = await fetch(`${u}/${postId}`, {
        method: 'DELETE',
      }).then((response) => response.json());
      console.log(d);
      if (d && d.id) {
        //클래스선택해서 요소를 지운다.
      }
    }
  });
}

async function onList() {
  var res = await fetch(u, { method: 'GET' }).then((response) => response.json());

  var posts = res.list;
  console.log(res.list);

  var tbody = document.querySelector('#listAll > tbody');

  for (let i = 0; i < posts.length; i++) {
    var id = posts[i].id;
    globals[id] = posts[i];

    var tr = document.createElement('tr');
    tr.classList.add(`post_${id}`);
    tr.style.cursor = 'pointer';
    tr.addEventListener('click', function (e) {
      onRead(id);
    });

    var idTd = document.createElement('td');
    idTd.innerText = id;
    tr.appendChild(idTd);

    var authorTd = document.createElement('td');
    authorTd.innerText = 'somebody';
    tr.appendChild(authorTd);

    var contentTd = document.createElement('td');
    contentTd.innerText = posts[i].content;
    tr.appendChild(contentTd);

    var updatedTd = document.createElement('td');
    updatedTd.innerText = posts[i].updatedAt;
    tr.appendChild(updatedTd);

    tbody.appendChild(tr);
  }
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
  cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                     <a onClick="onDelete(this)">Delete</a>`;
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
