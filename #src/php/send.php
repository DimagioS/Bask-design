<?php 

require("./PHPMailer/PHPMailer.php");
require("./PHPMailer/Exception.php");
require("./PHPMailer/SMTP.php");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
  // Создаем письмо
  $mail->isSMTP();                                            //Send using SMTP
  $mail->Host       = 'smtp.mail.ru';                     //Set the SMTP server to send through
  $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
  $mail->Username = 'mail@mail.ru'; // Ваш логин от почты с которой будут отправляться письма
  $mail->Password = '12345'; // Ваш пароль от почты с которой будут отправляться письма
  $mail->SMTPSecure = 'ssl';
  $mail->Port       = 465;
  $mail->CharSet = 'utf-8'; 

  $phone = htmlspecialchars($_POST['tel'], ENT_QUOTES, 'UTF-8');
  $name = htmlspecialchars($_POST['name'], ENT_QUOTES, 'UTF-8');
  $subject = "Данные клиента"; //

  $mail->setFrom('mail@mail.ru', ''); // от кого (email и имя)
  $mail->addAddress('mail@mail.ru', '');  // кому (email и имя)
  $mail->Subject = $subject;                         // тема письма
  // html текст письма
  $mail->msgHTML("<html>
                    <body>
                      <p>Имя клиента: <b>$name</b></p>
                      <p>Телефон: <b style="'color': 'black'">$phone</b></p>
                    </body>
                  </html>");
  $mail->send();
  echo 'Message has been sent';
} catch (Exception $e) {
  echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}

?>