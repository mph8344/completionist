<?php
session_start();

// Profile Image Stuff
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $target_dir = __DIR__."/resources/" . $_SESSION["currentId"]."/";
    $target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);

    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
    if ($check == false) {
        echo "File is not an image. ";
        $uploadOk = 0;
    }
    if ($_FILES["fileToUpload"]["size"] > 50000000) {
        echo "Sorry, your file is too large. ";
        $uploadOk = 0;
    }
    if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
        && $imageFileType != "gif") {
        echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed. ";
        $uploadOk = 0;
    }
    if ($uploadOk == 0) {
        echo "Sorry, your file was not uploaded. ";
    } else {
        if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_dir . microtime(false) . ".png")) {
            header("location: /main");
        } else {
            echo "Sorry, there was an error when uploading your file. ";
        }
    }
}