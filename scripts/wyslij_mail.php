<?php
<?php
// Ustaw kodowanie znaków
header('Content-Type: application/json; charset=utf-8');

// Dane z formularza
$name    = isset($_POST['name'])    ? trim($_POST['name'])    : '';
$email   = isset($_POST['email'])   ? trim($_POST['email'])   : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Walidacja podstawowa
if (!$name || !$email || !$message || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'msg' => 'Wypełnij poprawnie wszystkie pola.']);
    exit;
}

// Adres docelowy
$to = 'jakub.kuzakowski@gmail.com';
$subject = 'Nowa wiadomość z formularza kontaktowego WebGoat';
$body = "Imię i nazwisko: $name\nE-mail: $email\n\nWiadomość:\n$message";
$headers = "From: $name <$email>\r\nReply-To: $email\r\nContent-Type: text/plain; charset=utf-8";

// Wyślij maila
$sent = mail($to, $subject, $body, $headers);

if ($sent) {
    echo json_encode(['success' => true, 'msg' => 'Wiadomość została wysłana!']);
} else {
    echo json_encode(['success' => false, 'msg' => 'Wystąpił błąd podczas wysyłania wiadomości.']);
}