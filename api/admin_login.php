<?php
include "db.php";

$data=json_decode(
file_get_contents("php://input"),
true
);

$email=$data["email"] ?? "";
$password=$data["password"] ?? "";

$sql="SELECT * FROM admins WHERE email=?";

$stmt=$conn->prepare($sql);

$stmt->bind_param(
"s",
$email
);

$stmt->execute();

$result=$stmt->get_result();

if($result->num_rows==1){

$admin=$result->fetch_assoc();

if(
password_verify(
$password,
$admin["password"]
)
){

$_SESSION["admin_id"]=
$admin["id"];

$_SESSION["admin_name"]=
$admin["name"];

echo json_encode([
"status"=>"success",
"message"=>"Admin Login Successful"
]);

}else{

echo json_encode([
"status"=>"error",
"message"=>"Wrong Password"
]);

}

}else{

echo json_encode([
"status"=>"error",
"message"=>"Admin not found"
]);

}
?>