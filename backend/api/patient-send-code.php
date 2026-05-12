<?php
require '../config/db.php';

$phone = $_POST['phone'] ?? '';
$code = rand(1000,9999);
$expire = date("Y-m-d H:i:s", time()+300);

$stmt = $pdo->prepare("INSERT INTO otp_codes(phone,code,expires_at) VALUES(?,?,?)");
$stmt->execute([$phone,$code,$expire]);

echo json_encode(['status'=>'sent','code'=>$code]);
