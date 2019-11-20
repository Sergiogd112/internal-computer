<?php
use PHPMailer\src\PHPMailer;
use PHPMailer\src\Exception;

require_once "vendor/autoload.php";
require_once "constants.php";

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = 'smtp.googlemail.com';  //gmail SMTP server
    $mail->SMTPAuth = true;
    $mail->Username = 'astroweathercs@gmail.com';   //username
    $mail->Password = 'eR21dEGPHpnU';   //password
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;                    //smtp port

    $mail->setFrom('astroweathercs@gmail.com', 'Contact astroweather');
    $mail->addAddress($_POST['email'], $_POST['name'] . ' ' . $_POST['surname']);


    $mail->isHTML(true);
    $mail->Subject = 'Contact[noreply]';
    $mail->Body    = $_POST['mess'];

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo 'Message could not be sent. Mailer Error: '. $mail->ErrorInfo;
}
 ?>
