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

$email = $data["email"] ?? "";
$password = $data["password"] ?? "";

if ($email == "" || $password == "") {
    echo json_encode([
        "status" => "error",
        "message" => "Email and password required"
    ]);
    exit();
}

/* USER LOGIN */
$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    if (password_verify($password, $user["password"])) {
        $_SESSION["role"] = "user";
        $_SESSION["user_id"] = $user["id"];
        $_SESSION["user_name"] = $user["full_name"];
        $_SESSION["user_email"] = $user["email"];

        echo json_encode([
            "status" => "success",
            "role" => "user",
            "message" => "User Login Successful"
        ]);
        exit();
    }
}

/* ADMIN LOGIN - plain password */
$sql = "SELECT * FROM admins WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $admin = $result->fetch_assoc();

    if ($password == $admin["password"]) {
        $_SESSION["role"] = "admin";
        $_SESSION["admin_id"] = $admin["id"];
        $_SESSION["admin_name"] = $admin["name"];
        $_SESSION["admin_email"] = $admin["email"];

        echo json_encode([
            "status" => "success",
            "role" => "admin",
            "message" => "Admin Login Successful"
        ]);
        exit();
    }
}

echo json_encode([
    "status" => "error",
    "message" => "Invalid Email or Password"
]);
?>