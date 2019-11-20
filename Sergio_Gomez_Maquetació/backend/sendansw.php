<?php
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
    $mail->Username = GMAIL_USERNAME;   //username
    $mail->Password = GMAIL_PASSWORD;   //password
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;                    //smtp port

    $mail->setFrom('FROM_EMAIL_ADDRESS', 'FROM_NAME');
    $mail->addAddress('RECEPIENT_EMAIL_ADDRESS', 'RECEPIENT_NAME');

    $mail->addAttachment(__DIR__ . '/attachment1.png');
    $mail->addAttachment(__DIR__ . '/attachment2.png');

    $mail->isHTML(true);
    $mail->Subject = 'Email Subject';
    $mail->Body    = '<b>Email Body</b>';

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo 'Message could not be sent. Mailer Error: '. $mail->ErrorInfo;
}
 ?>
