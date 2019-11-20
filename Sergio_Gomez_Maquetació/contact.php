<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
  <meta charset="utf-8">
  <title>Contact</title>
  <link rel="stylesheet" href="css/contactsyle.css">
  <link rel="stylesheet" href="css/main.css">
  <script src="js/contact.js" charset="utf-8"></script>
  <script src="js/include.js" charset="utf-8"></script>
  <script src="js/topnav.js" charset="utf-8"></script>
  <script src="js/readmess.js" charset="utf-8"></script>
</head>

<body onload="mainload();showmessage()">
  <div class="topnav" id='topnav'>
    <a class="acive" onclick="goto('index.html')">Home</a>
    <a onclick="goto('topcities.html')">Ranking</a>


    <a onclick="goto('about.html')">About</a>

    <a class="sign" onclick="goto('register.html')">Register</a>
    <a class="sign" onclick="goto('login.html')">Login</a>
    <a class="sign2" onclick="goto('contact.php')">Contact</a>
  </div>
  <?php
    $lname=$_GET["user"];
    $salt=$_GET["salt"];

    $servername = "localhost";
    $usr = "sgomez";
    $pass = "sgomez";
    $dbname = "sgomez_";

    // Create connection
    $conn = new mysqli($servername, $usr, $pass, $dbname);
    // Check connection
    if ($conn->connect_error) {
        echo `<div id="Contact"><form id="Contactform" onsubmit="send()"><h1 class="title">Contact</h1><h2>Email</h2><input type="text" name="username" value="pepepapa@crisp.chip"><h2>Name</h2><input type="text" name="name" value="Pepe"><h2>Surname</h2><input type="text" name="surname" value="papa"><h2>Message</h2><textarea name="message" cols="50" rows="10" id='Message'value="fdhsbjskdbgsdf\nI am your father ...(<|"></textarea><br></br><input type="submit" name="Send" value="Send"><p id="error"></p><br><br></form><p id="error"></p></div>`;
        die("Connection failed: " . $conn->connect_error);
    }
    $sql = "SELECT * FROM user_data WHERE username='$lname' AND salt='$salt'";
    $result = $conn->query($sql);
    if ($result->num_rows>0) {
      echo "ja";
        echo '<div id="Contact" >        <h1 id="name">Pepe papa</h1>        <h1 id="email">pepepapa@crisp.chip</h1>        <p id="mess">  Dummy patata messag</p>     <div id="answf">   <button type="button" name="next" id="next" onclick="next()">Next</button>        <button type="button" name="delete" id="del" onclick="del()">Delete</button>        <button type="button" name="answer" id="answ" onclick="answ()">Answer</button>        <div id="answf"></div></div>';
    } else {
      echo '<div id="Contact"><form id="Contactform" onsubmit="send()"><h1 class="title">Contact</h1><h2>Email</h2><input type="text" name="username" value="pepepapa@crisp.chip"><h2>Name</h2><input type="text" name="name" value="Pepe"><h2>Surname</h2><input type="text" name="surname" value="papa"><h2>Message</h2><textarea name="message" cols="50" rows="10" id="Message"></textarea><br></br><p id="error"></p><br><br></form><button type="button" name="Send" onclick="sendmess()">Send</button></div>';
    }
    mysqli_free_result($res);
   ?>

</body>

</html>
