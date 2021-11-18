var selectedRow = null;

const baseUrl = 'http://chifuyu74.shop/post';

async function add(data) {
  var res = await fetch(`${baseUrl}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      title: data.title,
      content: data.content,
    }),
  }).then((res) => res.json());

  var add_button = document.createElement('add_button');
  add_button.addEventListener('click', function (e) {
    save();
  });
}

function save() {
  var add_title = document.getElementById('#title');
  add_title.innerHTML = add_title.title;

  var add_writer = document.getElementById('#writer');
  add_writer.innerHTML = add_writer.writer;

  var add_content = document.getElementById('#content');
  add_content.innerHTML = add_content.content;

  console.log(add_title);
}

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
  add(data);
}
function resetForm() {
  document.getElementById('title').value = '';
  document.getElementById('writer').value = '';
  document.getElementById('content').value = '';
  selectedRow = null;
}
