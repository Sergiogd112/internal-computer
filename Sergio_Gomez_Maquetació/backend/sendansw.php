<?php
echo "in\n" . "\n---\n";
//$data=json_decode(urldecode($_GET['data']), true);
$email=$_GET['email'];
$mess=urldecode($_GET['mess']);
$command=str_replace("\n","",shell_exec("which python3"))." " . "./mailer.py astroweathercs@gmail.com eR21dEGPHpnU smtp.gmail.com [". $email . ",] \"Contact Astroweather CS\" \"" . $mess . "\" []";
//$command=str_replace("\n","\\n",$command);
echo $email . "\n-------------------------------------------------------\n";
echo $command . "\n-------------------------------------------------\n";
$descriptorspec = array(
   0 => array("pipe", "r"),  // stdin
   1 => array("pipe", "w"),  // stdout
   2 => array("pipe", "w"),  // stderr
);

$process = proc_open($command, $descriptorspec, $pipes, dirname(__FILE__), null);

$stdout = stream_get_contents($pipes[1]);
fclose($pipes[1]);

$stderr = stream_get_contents($pipes[2]);
fclose($pipes[2]);
echo "stdout : \n";
var_dump($stdout);

echo "stderr :\n";
var_dump($stderr);
echo $process. "\n-------------------------------------------------\n";
var_dump($output);
echo "\n-------------------------------------------------\n";
echo shell_exec("pwd") . "\n-------------------------------------------------\n";
echo shell_exec("which python3") . "\n-------------------------------------------------\n";
 ?>
