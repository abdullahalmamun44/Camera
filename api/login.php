<?php
include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$email = $data["email"] ?? "";
$password = $data["password"] ?? "";

$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();

    if (password_verify($password, $user["password"])) {

        $_SESSION["user_id"] = $user["id"];
        $_SESSION["user_name"] = $user["full_name"];
        $_SESSION["user_email"] = $user["email"];

        echo json_encode([
            "status" => "success",
            "message" => "Login successful",
            "user" => [
                "id" => $user["id"],
                "name" => $user["full_name"],
                "email" => $user["email"]
            ]
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Wrong password"
        ]);
    }
} else {
    echo json_encode([
        "status" => "error",
        "message" => "User not found"
    ]);
}
?>