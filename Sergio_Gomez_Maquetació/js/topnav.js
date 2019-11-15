var user = localStorage.getItem('name');
var salt = localStorage.getItem('salt');

function goto(page) {
  if((user!=null) && (salt!=null)){
    if (page.includes('.php')) {
      window.location.href = "./"+page+"";
      console.log(user);
    }else{
      window.location.href = "./"+page+"";

    }

  }
}
function navtype() {
  if (user!=null) {
    document.getElementsByTagName('body').innerHTML.replace('embeds/topnav.html','embeds/topnavloged.html');
    console.log('changingnav');
  }
}
function mainload() {
  navtype();
  includeHTML();
}
