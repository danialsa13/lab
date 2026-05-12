<?php
require '../config/db.php';

$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';
$date = $_POST['date'] ?? '';
$doctor = $_POST['doctor'] ?? '';
$message = $_POST['message'] ?? '';

$stmt = $pdo->prepare("INSERT INTO appointments(name,email,phone,doctor,appointment_date,message) VALUES(?,?,?,?,?,?)");
$stmt->execute([$name,$email,$phone,$doctor,$date,$message]);

echo json_encode(['status'=>'ok']);
