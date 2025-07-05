<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['email']) || !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'error' => 'Неверный email']);
    exit;
}

$email = $data['email'];
$subject = $data['subject'] ?? 'Заказ с сайта ТрасоваСантех';
$message = $data['message'] ?? '';

$mail = new PHPMailer(true);

try {
    // Настройки сервера
    $mail->isSMTP();
    $mail->Host = 'smtp.yandex.ru';
    $mail->SMTPAuth = true;
    $mail->Username = 'ваша-почта@yandex.ru';
    $mail->Password = 'ваш-пароль';
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;
    $mail->CharSet = 'UTF-8';

    // Отправитель и получатель
    $mail->setFrom('ваша-почта@yandex.ru', 'ТрасоваСантех');
    $mail->addAddress($email);

    // Содержание письма
    $mail->isHTML(false);
    $mail->Subject = $subject;
    $mail->Body = $message;

    $mail->send();
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => 'Ошибка при отправке письма: ' . $mail->ErrorInfo
    ]);
}