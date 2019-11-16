var url='backend/mess.php'
var id,mess;
function getmessages(start,end) {
  return fetch(url+'?start='+start+'&end='+end).then(data => {
    return data.json()
  });
}
function showmessage() {
  var start=0;
  var end;
  mess=getmessages(start,end);

}
function updatemessage() {
  d=mess[id];
  document.getElementById('name').innerHTML=d.name+' '+d.surname;
  document.getElementById('email')=d.email;
  document.getElementById('mess')=d.mess;
}
