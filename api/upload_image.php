<?php
include "db.php";

if (($_SESSION["role"] ?? "") !== "admin") {
    echo json_encode([
        "status"=>"error",
        "message"=>"Only admin allowed"
    ]);
    exit();
}

if(!isset($_FILES["image"])){

    echo json_encode([
        "status"=>"error",
        "message"=>"No image selected"
    ]);

    exit();
}

$folder="../uploads/";

if(!file_exists($folder)){
    mkdir($folder,0777,true);
}

$fileName=
time()."_".
basename(
$_FILES["image"]["name"]
);

$target=
$folder.$fileName;

if(
move_uploaded_file(
$_FILES["image"]["tmp_name"],
$target
)
){

echo json_encode([

"status"=>"success",

"message"=>"Image uploaded successfully",

"image_url"=>
"http://localhost:8080/Camera/uploads/".$fileName

]);

}else{

echo json_encode([

"status"=>"error",

"message"=>"Upload failed"

]);

}
?>