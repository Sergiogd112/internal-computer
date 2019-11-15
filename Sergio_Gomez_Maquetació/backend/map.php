<?php
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

$sql = "SELECT * FROM History";
$result = $conn->query($sql);
$data=[];
if($result) {
    while($row = mysqli_fetch_assoc($result)){
        $d=[];
        $d['lat']=$row['lat'];
        $d['lon']=$row['lon'];
        $d['count']=$row['count'];
        $data[$row['id']]=$d;
    }
echo json_encode($data);
}
 ?>
