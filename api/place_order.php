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
$quantity = (int)($data["quantity"] ?? 1);
$address = $data["address"] ?? "";
$phone = $data["phone"] ?? "";
$payment_method = $data["payment_method"] ?? "";

if ($address == "" || $phone == "" || $payment_method == "") {
    echo json_encode([
        "status" => "error",
        "message" => "Please fill all order information"
    ]);
    exit();
}

$productQuery = $conn->prepare("SELECT * FROM products WHERE id = ?");
$productQuery->bind_param("i", $product_id);
$productQuery->execute();
$productResult = $productQuery->get_result();

if ($productResult->num_rows == 0) {
    echo json_encode([
        "status" => "error",
        "message" => "Product not found"
    ]);
    exit();
}

$product = $productResult->fetch_assoc();

if ($product["quantity"] < $quantity) {
    echo json_encode([
        "status" => "error",
        "message" => "Not enough stock"
    ]);
    exit();
}

$total_amount = $product["price"] * $quantity;

$name = $_SESSION["user_name"];
$email = $_SESSION["user_email"];

$sql = "INSERT INTO orders
(user_id, product_id, customer_name, customer_email, address, phone, payment_method, quantity, total_amount)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param(
    "iisssssid",
    $user_id,
    $product_id,
    $name,
    $email,
    $address,
    $phone,
    $payment_method,
    $quantity,
    $total_amount
);

if ($stmt->execute()) {
    $newQty = $product["quantity"] - $quantity;
    $status = $newQty <= 0 ? "stock_out" : "in_stock";

    $update = $conn->prepare("UPDATE products SET quantity = ?, stock_status = ? WHERE id = ?");
    $update->bind_param("isi", $newQty, $status, $product_id);
    $update->execute();

    echo json_encode([
        "status" => "success",
        "message" => "Order placed successfully"
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Order failed"
    ]);
}
?>