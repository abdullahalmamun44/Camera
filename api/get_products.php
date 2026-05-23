<?php
include "db.php";

$category = $_GET["category"] ?? "";

if ($category != "") {
    $stmt = $conn->prepare("SELECT * FROM products WHERE category=? ORDER BY id DESC");
    $stmt->bind_param("s", $category);
    $stmt->execute();
    $result = $stmt->get_result();
} else {
    $result = $conn->query("SELECT * FROM products ORDER BY id DESC");
}

$products = [];

while ($row = $result->fetch_assoc()) {
    $products[] = $row;
}

echo json_encode([
    "status" => "success",
    "products" => $products
]);
?>