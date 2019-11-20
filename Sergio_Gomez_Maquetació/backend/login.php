<?php
$lname=$_POST["logname"];
$pss=$_POST["password"];

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

$sql = "SELECT * FROM user_data WHERE username='$lname' OR email='$lname'";
$result = $conn->query($sql);
if ($result->num_rows>0)
{
  $row=$result->fetch_assoc();
  $salt=$row['salt'];
  $pw=hash('sha256', $pss . $salt);
  $resp=[];
  if($row['password']==$pw){
    $resp['status']=1;
    $resp['user']=$lname;
    $resp['salt']=$salt;
  }else{
    $resp['satus']=0;

  }
}else {
    $resp['satus']=2;
}
echo json_encode($resp);
mysqli_free_result($res);


 ?>
