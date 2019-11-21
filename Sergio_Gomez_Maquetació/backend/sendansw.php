<?php
echo "in";
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;  /* Exception class. */
require 'PHPMailer/src/Exception.php';  /* The main PHPMailer class. */
require 'PHPMailer/src/PHPMailer.php';  /* SMTP class, needed if you want to use SMTP. */
require 'PHPMailer/src/SMTP.php';
$email = new PHPMailer(); /* ... */

try {
  echo "0";
    $mail->IsSMTP(); // enable SMTP
    echo "0.5";
    $mail->SMTPDebug = 1; // debugging: 1 = errors and messages, 2 = messages only
    echo "1";
    $mail->SMTPAuth = true; // authentication enabled
    $mail->SMTPSecure = 'tls'; // secure transfer enabled REQUIRED for Gmail
    $mail->Host = "smtp.gmail.com";
    $mail->Port = 465; // or 587
    echo "4";
    $mail->setFrom('astroweathercs@gmail.com', 'Contact astroweather');
    $mail->addAddress($_POST['email'], $_POST['name'] . ' ' . $_POST['surname']);
    echo "5";

    $mail->isHTML(true);
    $mail->Subject = 'Contact[noreply]';
    $mail->Body    = $_POST['mess'];

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
  try {
    echo "6";
    echo 'Message could not be sent. Mailer Error: '. $mail->ErrorInfo;
  } catch (Exception $e) {
    echo "7";
  }


}
 ?>
