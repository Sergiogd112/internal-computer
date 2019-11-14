function send() {
  console.log('inf');
  form=document.getElementById('Contact');
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    console.log('in');
    if (this.readyState == 4 && this.status == 200) {
      var resp = this.responseText;
      if (resp == '1') {
        // Simulate a mouse click:
        console.log('correct!!!!');
      }else{
        console.log('0')
        document.getElementById('error').innerHTML = 'unable to login';

      }
    } 
  }

  xhttp.open("POST", "backend/contact.php", true);
  xhttp.send(new FormData(formElement));
}
