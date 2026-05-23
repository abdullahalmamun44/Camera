<?php
include "db.php";

if (!isset($_SESSION["user_id"])) {
    echo json_encode([
        "status" => "error",
        "message" => "Please login first"
    ]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

$user_id = $_SESSION["user_id"];
$product_id = $data["product_id"] ?? 0;

if ($product_id == 0) {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid product"
    ]);
    exit();
}

$check = $conn->prepare("SELECT * FROM cart WHERE user_id=? AND product_id=?");
$check->bind_param("ii", $user_id, $product_id);
$check->execute();
$result = $check->get_result();

if ($result->num_rows > 0) {
    $update = $conn->prepare("UPDATE cart SET quantity = quantity + 1 WHERE user_id=? AND product_id=?");
    $update->bind_param("ii", $user_id, $product_id);
    $update->execute();

    echo json_encode([
        "status" => "success",
        "message" => "Cart quantity updated"
    ]);
} else {
    $insert = $conn->prepare("INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, 1)");
    $insert->bind_param("ii", $user_id, $product_id);
    $insert->execute();

    echo json_encode([
        "status" => "success",
        "message" => "Product added to cart"
    ]);
}
?>