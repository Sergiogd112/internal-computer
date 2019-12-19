<?php
$lname=$_POST["usename"];
$name=$_POST["name"];
$sname=$_POST["surname"];
$mess=$_POST["message"];


$servername = "localhost";
include 'config.php'
$usr = $dbuser;
$pass = $dbpass;
$dbname = $dbname;


echo 'connecting';
// Create connection
$conn = new mysqli($servername, $usr, $pass, $dbname);
// Check connection
echo "checking connection";
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO `Contact` (`name`, `surname`, `email`, `message`) VALUES ('$name', '$sname', '$lname', '$mess')";
echo $sql;
$res = $conn->query($sql);
echo $res;

try {
  mysqli_free_result($res);
} catch (\Exception $e) {
  echo "";
}
echo 1;
?>
