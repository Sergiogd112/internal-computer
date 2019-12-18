function sendmess() {
  console.log('inf');
  form=document.getElementById('Contactform');
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    console.log('in');
    if (this.readyState == 4 && this.status == 200) {
      var resp = this.responseText;
      console.log(resp);
      if (resp.includes('1')) {
        window.location.href = "index.html";

        // Simulate a mouse click:
      }else{
        console.log('0')
        document.getElementById('error').innerHTML = 'unable to send the message';

      }
    }
  }
  var url="backend/sendmess.php";

  console.log(url);
  xhttp.open("POST", url, true);
  formd=new FormData(form);
  xhttp.send(formd);
  return false;
}
