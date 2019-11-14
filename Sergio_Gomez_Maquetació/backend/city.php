<?php
$lat=$_POST["lat"];
$lon=$_POST["lon"];
echo $lat,$lon;

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

$sql = "SELECT * FROM History WHERE username='$lname' OR email='$lname'";
$result = $conn->query($sql);
if ($result->num_rows>0)
{
  $row=$result->fetch_assoc();
  $count=$row['count']+1;
  $sql1 = "UPDATE `History` SET `count`='$count' WHERE    lat = '$lat' AND lon = '$lon'";
  $res = $conn->query($sql1);
  mysqli_free_result($res);
  echo 1;
}else {
  echo "2";
}
echo $result;
mysqli_free_result($res);

 ?>
