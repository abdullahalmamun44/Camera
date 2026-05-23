<?php
include "db.php";

if (!isset($_SESSION["role"]) || $_SESSION["role"] !== "admin") {
    echo json_encode([
        "status" => "error",
        "message" => "Only admin can add products"
    ]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

$title = $data["title"] ?? "";
$description = $data["description"] ?? "";
$category = $data["category"] ?? "";
$price = $data["price"] ?? 0;
$quantity = $data["quantity"] ?? 0;
$image_url = $data["image_url"] ?? "";

if ($title == "" || $category == "" || $price == "" || $image_url == "") {
    echo json_encode([
        "status" => "error",
        "message" => "Please fill all required fields"
    ]);
    exit();
}

$stock_status = ($quantity > 0) ? "in_stock" : "stock_out";

$sql = "INSERT INTO products 
(title, description, category, price, quantity, image_url, stock_status)
VALUES (?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param(
    "sssdiis",
    $title,
    $description,
    $category,
    $price,
    $quantity,
    $image_url,
    $stock_status
);

if ($stmt->execute()) {
    echo json_encode([
        "status" => "success",
        "message" => "Product added successfully"
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Product add failed"
    ]);
}
?>