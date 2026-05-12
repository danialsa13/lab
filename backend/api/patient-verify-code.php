<?php
session_start();
require '../config/db.php';

$phone = $_POST['phone'] ?? '';
$code  = $_POST['code'] ?? '';

$stmt = $pdo->prepare("SELECT * FROM otp_codes WHERE phone=? AND code=? AND expires_at > NOW() ORDER BY id DESC LIMIT 1");
$stmt->execute([$phone,$code]);

if ($stmt->fetch()) {
    $stmt2 = $pdo->prepare("SELECT * FROM patients WHERE phone=?");
    $stmt2->execute([$phone]);
    $patient = $stmt2->fetch();

    if (!$patient) {
        $stmt3 = $pdo->prepare("INSERT INTO patients(phone) VALUES(?)");
        $stmt3->execute([$phone]);
        $patient_id = $pdo->lastInsertId();
    } else {
        $patient_id = $patient['id'];
    }

    $_SESSION['patient'] = $patient_id;
    echo json_encode(['status'=>'success']);
} else {
    echo json_encode(['status'=>'invalid']);
}
