<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>loading</title>
    <link rel="stylesheet" href="css/loading.css">

  </head>
  <body>
<div class="main">
<div class="loader">

</div>
<p>Loading</p>
Welcome <?php echo $_POST["name"];
?><br>
<?php
$name=$_POST["name"];
$username=$_POST["username"];
$surname=$_POST["surname"];
$pw=$_POST["password"];
$str=rand();
$salt = md5($str);
$pw=hash('sha256', $pw . $salt);
$email=$_POST["email"];
$servername = "localhost";
$usr = "sgomez";
$pass = "sgomez";
$dbname = "sgomez_";

// Create connection
$conn = new mysqli($servername, $usr, $pass, $dbname);
// Check connection
if ($name=="" or $username=="" or $surname=="" or $pw=="" or $email=="") {
    header('Location: '.'register.html');
}
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO user_data (name, password, email,username,surname,salt)
VALUES ('$name','$pw','$email','$username','$surname','$salt')";

if ($conn->query($sql) === true) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
header('Location: '.'index.html');
 ?>
</div>

  </body>
</html>
