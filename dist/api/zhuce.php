<?php

$con = mysqli_connect('localhost','root','123456','butao');

$username = $_POST['username'];
$phonenum = $_POST['phonenum'];
$password = $_POST['password'];


$sql = "SELECT * FROM `users` WHERE `username`='$username'";
$sql1 = "SELECT * FROM `users` WHERE `phonenum`='$phonenum'";

$selectRes = mysqli_query($con,$sql);

$row = mysqli_fetch_assoc($selectRes);

if (!$row) {
    // 没有匹配的数据 注册成功
    echo json_encode(array(
      "code" => 0,
      "message" => "注册成功" 
    ));
    $insertSql = "INSERT INTO `users` VALUES(null,'$username','$password','$phonenum')";
    $inserrRes = mysqli_query($con,$insertSql);
  } else {
    // 有匹配的数据 注册失败
    echo json_encode(array(
      "code" => 1,
      "message" => "注册失败"
    ));
  }

?>
