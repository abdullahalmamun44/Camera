<?php
include "db.php";

if (!isset($_SESSION["user_id"])) {
    echo json_encode([
        "status" => "error",
        "message" => "Not logged in"
    ]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

$full_name = $data["full_name"] ?? "";
$email = $data["email"] ?? "";

if ($full_name == "" || $email == "") {
    echo json_encode([
        "status" => "error",
        "message" => "Name and email are required"
    ]);
    exit();
}

$sql = "UPDATE users SET full_name = ?, email = ? WHERE id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ssi", $full_name, $email, $_SESSION["user_id"]);

if ($stmt->execute()) {
    $_SESSION["user_name"] = $full_name;
    $_SESSION["user_email"] = $email;

    echo json_encode([
        "status" => "success",
        "message" => "Profile updated successfully",
        "user" => [
            "id" => $_SESSION["user_id"],
            "name" => $full_name,
            "email" => $email
        ]
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Update failed"
    ]);
}
?>