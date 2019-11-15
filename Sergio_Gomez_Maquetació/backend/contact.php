<?php
$lname=$_POST["usename"];
$name=$_POST["name"];
$sname=$_POST["surname"];
$mess=$_POST["message"];


$servername = "localhost";
$usr = "sgomez";
$pass = "sgomez";
$dbname = "sgomez_";


echo 'connecting';
// Create connection
$conn = new mysqli($servername, $usr, $pass, $dbname);
// Check connection
echo "checking connection";
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO `Contact` (`name`, `surname`, `email`, `message`) VALUES ('$name', '$sname', '$lname', '$mess')";
$res = $conn->query($sql);
mysqli_free_result($res);
echo 1;

 ?>
