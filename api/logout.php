<?php
include "db.php";

session_unset();
session_destroy();

echo json_encode([
    "status" => "success",
    "message" => "Logout successful"
]);
?>