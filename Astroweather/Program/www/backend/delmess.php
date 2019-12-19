<?php
$id=$_GET['id'];

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

$sql = "UPDATE Contact SET `archived`=1 WHERE id='$id'";
$result = $conn->query($sql);
echo $sql;
echo "\n";
echo $result;
try {
  mysqli_free_result($res);
} catch (\Exception $e) {
  echo "";
}?>
