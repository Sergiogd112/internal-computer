<?php
$start=$_GET["start"];
$end=$_GET["end"];

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

$sql = "SELECT * FROM Contact WHERE id>$start AND id<$end";
$result = $conn->query($sql);
$data=[];
if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $d=[];
        $d['name']=$row['name'];
        $d['surname']=$row['surname'];
        $d['mess']=$row['message'];
        $data[$row['id']]=$d;
    }
    echo json_encode($data);
}
?>
