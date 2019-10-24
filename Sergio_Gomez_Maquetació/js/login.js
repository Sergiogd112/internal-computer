function login() {
  var formElement = document.getElementById("Login");
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    console.log('in');
    if (this.readyState == 4 && this.status == 200) {
      var resp = this.responseText;
      if (resp == '0') {
        console.log(0)
        document.getElementById('error').innerHTML = 'username/email or password incorrect';
      } else if (resp == '1') {
        // Simulate a mouse click:
        console.log('correct!!!!');
        window.location.href = "index.html";
      }else{
        console.log('2')
        document.getElementById('error').innerHTML = 'unable to login';

      }
    }
  }

  xhttp.open("POST", "login.php", true);
  xhttp.send(new FormData(formElement));
}
