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
$pw=$_POST["password"];
$email=$_POST["email"];
$servername = "localhost";
$usr = "sgomez";
$pass = "sgomez";
$dbname = "sgomez_";

// Create connection
$conn = new mysqli($servername, $usr, $pass, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO test (name, password, mail)
VALUES ('$name','$pw','$email')";
echo $sql;
if ($conn->query($sql) === true) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

 ?>
</div>

  </body>
</html>
