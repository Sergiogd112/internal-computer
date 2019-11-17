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
  });
}

async function showmessage() {
  var start = 0;
  var end;
  getmessages(start, end);
  updatemessage();
}

function updatemessage() {
  var d = mess[id];
  document.getElementById('name').innerHTML = d.name + ' ' + d.surname;
  document.getElementById('email') = d['email'];
  document.getElementById('mess') = d.mess;
  n = n + 1
  id = keys[n];
}

function del() {
  fetch('backend/delmess.php?id='+
    id).then(data => {
    return data.json();
  }).then(data => {
    updatemessage();

  });

}
next = updatemessage;

function answ() {
  var answf = document.getElementsById('answf');
  var ansb = document.getElementById('answ');
  var form = `
  <form id="Contactform">
    <h2>Message</h2>
    <textarea name="message" cols="50" rows="10" id='Message'value="fdhsbjskdbgsdf\nI am your father ...(<|"></textarea>
    <br></br>
    <p id="error"></p>
    <br><br>
  </form>
`;
  var anbutton = `<button type="button" name="answer" id="answ" onclick="answ()">Answer</button>`;
  var sendbutton = `<button type="button" name="answer" id="answ" onclick="sendansw()">Sendswer</button> <button type="button" name="answer" id="answ" onclick="cancelansw()">Cancel</button>`;
  answf.innerHTML=form+answf.innerHTML.replace(anbutton,sendbutton);
}
