function login() {
  var formElement = document.getElementByClass("myFormElement");
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var resp = this.responseText;
      if (resp == '0') {
        document.getElementById('error') = 'username/email or password incorrect';
      } else if (resp == '1') {
        // Simulate a mouse click:
        window.location.href = "/index.html";
      }else{
        document.getElementById('error') = 'unable to login';

      }

    }
  }

  xhttp.open("POST", "login.php");
  xhttp.send(new FormData(formElement));
}
