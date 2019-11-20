var url = 'backend/mess.php'
var id;
var mess;
var keys;
var n;

function getmessages(start, end) {
  return fetch(url + '?start=' + start + '&end=' + end).then(data => {
    return data.json()
  }).then(data => {
    mess = data;
    keys = Object.keys(mess);
    id = keys[0];
    n = 0;
    updatemessage();
  });
}

function showmessage() {
  if (document.getElementById('Contact')) {
    var start = 0;
    var end;
    getmessages(start, end);
  }
}

function updatemessage() {
  var d = mess[id];
  document.getElementById('name').innerHTML = d.name + ' ' + d.surname;
  document.getElementById('email').innerHTML = d['email'];
  document.getElementById('mess').innerHTML = d['mess'];
  n = n + 1
  id = keys[n];
}

function del() {
  fetch('backend/delmess.php?id=' +
    id).then(data => {
    return data.json();
  }).then(data => {
    updatemessage();

  });

}
next = updatemessage;

function answ() {
  var answf = document.getElementById('answf');
  var ansb = document.getElementById('answ');
  var anbutton = `<button type="button" name="answer" id="answ" onclick="answ()">Answer</button>`;
  var sendbutton = `<button type="submit" name="answer" id="answ" onclick='sendansw()'>Send answer</button> <button type="button" name="answer" id="answ" onclick="cancelansw()">Cancel</button>`;
  var form = `
  <form id="Contactform">
    <h2>Message</h2>
    <textarea name="message" cols="50" rows="10" id='Message'></textarea>
    <br></br>
    <p id="error"></p>
    <br><br>
  </form>
` + answf.innerHTML.replace(anbutton, sendbutton);
  answf.innerHTML = form;
}

function sendansw() {
  var data = {
    mess: document.getElementById('Message').value,
    email: mess[keys[n - 1]].email,
    name: mess[keys[n - 1]].name,
    sname: mess[keys[n - 1]].sname
  };
  console.log(mess[keys[n - 1]].email);
  data = JSON.stringify(data);
  console.log(data);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    console.log('in');
    if (this.readyState == 4 && this.status == 200) {
      var resp = this.responseText;
      console.log(resp);
      if (resp.includes('1')) {
        // Simulate a mouse click:
        alert('correct!!!!');
        document.getElementById('answf').innerHTML.replace(`
        <form id="Contactform">
          <h2>Message</h2>
          <textarea name="message" cols="50" rows="10" id='Message'></textarea>
          <br></br>
          <p id="error"></p>
          <br><br>
        </form>
      `, '').replace(`<button type="submit" name="answer" id="answ" onclick='sendansw()'>Send answer</button>
      <button type="button" name="answer" id="answ" onclick="cancelansw()">Cancel</button>`,
          '<button type="button" name="answer" id="answ" onclick="answ()">Answer</button>'
        )
      } else {
        console.log('0')
        document.getElementById('error').innerHTML = 'unable to send the message';

      }
    }
  }
  var url = "backend/sendansw.php";

  xhttp.open("POST", url, true);
  xhttp.send(data);
}

function cancelansw() {
  document.getElementById('answf').innerHTML.replace(`
  <form id="Contactform">
    <h2>Message</h2>
    <textarea name="message" cols="50" rows="10" id='Message'></textarea>
    <br></br>
    <p id="error"></p>
    <br><br>
  </form>
`, '').replace(`<button type="submit" name="answer" id="answ" onclick='sendansw()'>Send answer</button>
<button type="button" name="answer" id="answ" onclick="cancelansw()">Cancel</button>`,
    '<button type="button" name="answer" id="answ" onclick="answ()">Answer</button>'
  )
}
