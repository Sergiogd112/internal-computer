function redirect(link) {
  console.log(document.URL);
  console.log(typeof(document.URL))

  var path = window.location.pathname;
  var page = path.split("/").pop();
  var dir = path.split("/").pop();

  console.log(page);
  var root = document.URL.replace(page, '');
  console.log(root);
  try {
    root = root.replace('www/', '');
    console.log(root);
    var nextpage = root + 'www/' + link;
    console.log(nextpage);
    window.location.href = nextpage;
  } catch (error) {
    console.log(error);
    root = root.replace('admin/', '');
    console.log(root);
    var nextpage = root + 'www/' + link;
    console.log(nextpage);
    window.location.href = nextpage;
  }
}