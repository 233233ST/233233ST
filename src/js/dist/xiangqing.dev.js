"use strict";

// 打开详情页的时候先查看是否有携带id参数
// 如果没有id参数的时候 跳转到列表
// 如果有id参数的时候 根据id去获取对象的数据 渲染
var reg = /id=(\d+)/;

if (!reg.test(location.search)) {
  location.href = "../index.html";
} // exec() 捕获字符串中满足正则的数据
// 以数组的形式返回
// 索引为0 的位置 得到就是满足正则条件的字符串
// 索引为1 的位置 满足正则条件 圆括号中的字符


var id = reg.exec(location.search)[1]; // console.log(id);

var container = document.querySelector(".container"); // 根据id获取数据

pAjax({
  url: "../api/getDetail.php",
  data: {
    id: id
  }
}).then(function (res) {
  res = JSON.parse(res);
  renderHtml(res.detail);
});

function renderHtml(data) {
  container.innerHTML = "\n        <ol class=\"breadcrumb\">\n            <li><a href=\"#\">\u8BE6\u60C5</a></li>\n        </ol>\n        <div class=\"media\">\n            <div class=\"media-left\">\n                <a href=\"#\">\n                    <img class=\"media-object\"\n                        src=\"".concat(data.goods_big_logo, "\"\n                        alt=\"...\">\n                </a>\n            </div>\n            <div class=\"media-body\">\n                <h4 class=\"media-heading\">").concat(data.goods_name, "\n                </h4>\n                <div class=\"price\">\n                    <i class=\"glyphicon glyphicon-yen\"></i>\n                    <span>").concat(data.goods_price, "</span>\n                </div>\n                <div class=\"btn-group\" role=\"group\" aria-label=\"...\">\n                    <button type=\"button\" class=\"btn btn-default\">XL</button>\n                    <button type=\"button\" class=\"btn btn-default\">L</button>\n                    <button type=\"button\" class=\"btn btn-default\">M</button>\n                    <button type=\"button\" class=\"btn btn-default\">S</button>\n                    <button type=\"button\" class=\"btn btn-default\">XS</button>\n                </div>\n\n                <div>\n                    <button class=\"btn btn-warning btn-lg\" id=\"goCar\">\u67E5\u770B\u8D2D\u7269\u8F66</button>\n                    <button class=\"btn btn-danger btn-lg\" id=\"addCar\">\u52A0\u5165\u8D2D\u7269\u8F66</button>\n                </div>\n            </div>\n        </div>\n\n        <ul class=\"nav nav-tabs\">\n            <li role=\"presentation\" class=\"active\"><a href=\"#\">Home</a></li>\n            <li role=\"presentation\"><a href=\"#\">Profile</a></li>\n            <li role=\"presentation\"><a href=\"#\">Messages</a></li>\n        </ul>\n        <div class=\"goods_detail\">\n            ").concat(data.goods_introduce, "\n        </div>");
}

container.onclick = function () {
  var e = window.event;

  if (e.target.id == "goCar") {
    location.href = "../html/car.html";
  }

  if (e.target.id == "addCar") {
    // alert('添加购物车')
    // 把当前这个条商品的goods_id ，用户名 ，goods_num 添加到 购物车的表
    // goods_id = id
    // userName = getCookie('login)  如果没有登录的时候 不能添加数据，提示进行登录
    // goods_num  判断这个用户对应的这个goods_id 是否已经存在，如果存在 goods_num++，如果不存在操作添加商品到购物车，其中 goods_num = 1
    var login = getCookie("login");

    if (!login) {
      alert("没有登录请到登录页面进行登录");
      localStorage.setItem("url", location.href);
      location.href = "../html/login.html";
      return;
    } // 发添加购物车的ajax请求


    pAjax({
      url: "../api/addCar.php",
      type: "post",
      data: {
        goods_id: id,
        userName: login
      }
    }).then(function (res) {
      console.log(id);
      console.log(res);
    });
  }

  ;
};