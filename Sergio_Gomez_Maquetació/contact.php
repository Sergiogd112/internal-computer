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

<body onload="mainload()">
  <div class="topnav" w3-include-html="embeds/topnav.html">
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
        echo '<div id="Contact" w3-include-html="embeds/contactform.html"></div>';
        die("Connection failed: " . $conn->connect_error);
    }
    $sql = "SELECT * FROM user_data WHERE username='$lname' AND salt='$salt'";
    $result = $conn->query($sql);
    if ($result->num_rows>0) {
        echo '<div id="Contact" w3-include-html="embeds/readcont.html"></div>';
    } else {
        echo '<div id="Contact" w3-include-html="embeds/contactform.html"></div>';
    }

    mysqli_free_result($res);
   ?>

</body>

</html>
