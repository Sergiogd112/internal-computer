var user = localStorage.getItem('name');
var salt = localStorage.getItem('salt');

function goto(page) {
  if ((user != null) && (salt != null)) {
    if (page.includes('.php')) {
      window.location.href =  page + "?user="+user+"&salt="+salt;
    } else {
      window.location.href = page + "";

    }

  }else{

      window.location.href = page + "";


  }
}

function navtype() {
  user = localStorage.getItem('name')
  if (user != null) {
    var body=document.body;
    text=body.innerHTML.replace('embeds/topnav.html', 'embeds/topnavloged.html');
    body.innerHTML=text;
  }
}

async function mainload() {
  navtype();
  includeHTML();
}

function logout() {
  localStorage.clear();
  if (document.URL.includes('contact.php')) {
    window.location.href = './login.html';
  } else {
    window.location.href = document.URL;
  }
}
