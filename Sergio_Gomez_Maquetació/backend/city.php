<?php
$lat=$_POST["lat"];
$lon=$_POST["lon"];

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

$sql = "SELECT * FROM History WHERE lat='$lat' OR lon='$lon'";
$result = $conn->query($sql);
echo $sql;
echo "\n";
if ($result->num_rows>0)
{
  $row=$result->fetch_assoc();
  $count=$row['count']+1;
  $id=$row['id'];
  $sql1 = "UPDATE `History` SET `count`='$count' WHERE    id=$id";
  $res = $conn->query($sql1);
  echo '1\n';
  echo $count;
  echo "\n";
  echo $sql1;
}else {
 $sql1="INSERT INTO `History`(`lat`, `lon`, `count`) VALUES ($lat,$lon,1)";
 echo $sql1;
$res = $conn->query($sql1);
 echo $result;
}
mysqli_free_result($res);

 ?>
