<?php

$command = escapeshellcmd('backend/seeingdatagraber.py');
$output = shell_exec($command);
echo $output;

?>
