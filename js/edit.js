const u = 'http://chifuyu74.shop/post';

var globals = {};

function getUrlParams() {
  var params = {};

  window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (str, key, value) {
    params[key] = value;
  });

  return params;
}

const urlParams = getUrlParams();
console.log(urlParams);
var id = urlParams['id'];
console.log(id);

async function onList() {
  var res = await fetch(u, {
    method: 'GET',
  }).then((response) => response.json());

  var posts = res.list;
  console.log(res.list);

  for (let i = 0; i < posts.length; i++) {
    var id = posts[i].id;
    globals[id] = posts[i];
  }
  console.log(globals['52']);

  const post = globals['52'];
  console.log(post);

  const title = post['title'];
  console.log(title);

  const content = post['content'];
  console.log(content);

  var currentH1 = document.querySelector('#title');
  currentH1.value = title;
  console.log(currentH1.value);

  var con = document.querySelector('#content');
  con.value = content;
  console.log(con.value);
}
onList();

function modify() {
  var currentH1 = document.querySelector('#title');
  console.log(currentH1.value);

  var con = document.querySelector('#content');
  console.log(con.value);
  console.log(id);
  const data = {
    id,
    title: currentH1.value,
    content: con.value,
  };
  mo_add(data);
}

async function mo_add(data) {
  var res = await fetch(`${u}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

  var add_button = document.createElement('add_button');
  add_button.addEventListener('click', function (e) {
    save();
  });
}
