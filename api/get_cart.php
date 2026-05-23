<?php
include "db.php";

if(!isset($_SESSION["user_id"])){

echo json_encode([
"status"=>"error",
"message"=>"Please login"
]);

exit();

}

$user_id=$_SESSION["user_id"];

$sql="
SELECT
cart.id,
cart.quantity as cart_quantity,
products.id as product_id,
products.title,
products.price,
products.image_url

FROM cart

JOIN products
ON cart.product_id=products.id

WHERE cart.user_id=?
";

$stmt=$conn->prepare($sql);

$stmt->bind_param(
"i",
$user_id
);

$stmt->execute();

$result=
$stmt->get_result();

$data=[];

while(
$row=
$result->fetch_assoc()
){

$data[]=$row;

}

echo json_encode([
"status"=>"success",
"products"=>$data
]);

?>