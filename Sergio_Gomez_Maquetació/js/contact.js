function send() {
  console.log('inf');
  form=document.getElementById('Contactform');
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    console.log('in');
    if (this.readyState == 4 && this.status == 200) {
      var resp = this.responseText;
      console.log(resp);
      alert(resp);
      if (resp.includes('1')) {
        // Simulate a mouse click:
        alert('correct!!!!');
      }else{
        console.log('0')
        document.getElementById('error').innerHTML = 'unable to send the message';

      }
    }
  }
  var url="backend/sendmess.php";
  if(document.URL.includes('btx')){
    url='https://btx.aula-ee.com/sgomez/internal-computer/Sergio_Gomez_Maquetació/'+url;
  }
  xhttp.open("POST", url, true);
  formd=new FormData(form);
  xhttp.send(formd);
  return false;
}
