<?php

$con = mysqli_connect('localhost','root','123456','butao');

  $id = $_GET['id'];

  $sql = "SELECT * FROM `goods` WHERE `goods_id`='$id'";

  $res = mysqli_query($con,$sql);

  if (!$res) {
    die('error for mysql: ' . mysqli_error($con));
  }

  $row = mysqli_fetch_assoc($res);

  echo json_encode(array(
    "code" => 1,
    "message" => "获取商品信息成功",
    "detail" => $row
  ))

?>
