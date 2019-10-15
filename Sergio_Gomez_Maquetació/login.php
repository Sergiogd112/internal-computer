
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
echo $sql;
$result = $conn->query($sql);
if ($result->num_rows>0)
{
  $row=$result->fetch_assoc();
  $salt=$row['salt'];
  $pw=hash('sha256', $pss . $salt);
  if($row['password']==$pw){
    echo "1";
  }else{
    echo "0";
  }
}else {
  echo "2";
}

mysqli_free_result($res);


echo "done";

 ?>
