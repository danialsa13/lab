<?php
require '../config/db.php';

$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$subject = $_POST['subject'] ?? '';
$message = $_POST['message'] ?? '';

$stmt = $pdo->prepare("INSERT INTO contacts(name,email,subject,message) VALUES(?,?,?,?)");
$stmt->execute([$name,$email,$subject,$message]);

echo json_encode(['status'=>'ok']);
