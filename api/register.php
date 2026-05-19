<?php
include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode([
        "status" => "error",
        "message" => "No data received"
    ]);
    exit();
}

$full_name = $data["full_name"] ?? "";
$email = $data["email"] ?? "";
$password = $data["password"] ?? "";

if ($full_name == "" || $email == "" || $password == "") {
    echo json_encode([
        "status" => "error",
        "message" => "All fields are required"
    ]);
    exit();
}

$hashed_password = password_hash($password, PASSWORD_DEFAULT);

$sql = "INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $full_name, $email, $hashed_password);

if ($stmt->execute()) {
    echo json_encode([
        "status" => "success",
        "message" => "Account created successfully"
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Email already exists or database error"
    ]);
}
?>