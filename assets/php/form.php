<?php
if((isset($_POST['name'])&&$_POST['name']!="")&&(isset($_POST['tel'])&&$_POST['tel']!="")) {
    $thm  = 'Форма обратной связи сайта arzamas-komfort.ru';
    $thm  = "=?utf-8?b?". base64_encode($thm) ."?=";
    $msg = '
    <html>
        <body>
            <p>Имя: '.$_POST['name'].'</p>
            <p>Телефон: '.$_POST['tel'].'</p>
            <p>Дата заселения: '.$_POST['date-in'].'</p>
            <p>Дата отъезда: '.$_POST['date-out'].'</p>
            <p>Комментарий: '.$_POST['comment'].'</p>
            <p>Квартира: '.$_POST['address'].'</p>
        </body>
    </html>';
    $mail_to = 'arzamas-komfort@yandex.ru';
    $headers  = "Content-type: text/html; charset=utf-8" . "\r\n";
    $headers .= "From: Order@vh128.timeweb.ru" . "\r\n";

// Отправляем почтовое сообщение

    mail( $mail_to, $thm, $msg, $headers);
}
?>
