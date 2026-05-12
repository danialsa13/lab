<?php
session_start();
require '../config/db.php';

$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

$stmt = $pdo->prepare("SELECT * FROM admins WHERE username=? AND password=?");
$stmt->execute([$username, md5($password)]);
$admin = $stmt->fetch();

if ($admin) {
    $_SESSION['admin'] = $admin['id'];
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error']);
}
