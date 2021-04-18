"use strict";

var username = document.querySelector("#username");
var phonenum = document.querySelector("#phonenum");
var password = document.querySelector("#password");
var form = document.querySelector("#form-horizontal");
console.log(form);

form.onsubmit = function () {
  var e = window.event;
  e.preventDefault();
  pAjax({
    type: 'post',
    url: '../api/zhuce.php',
    data: {
      username: username.value,
      phonenum: phonenum.value,
      password: password.value
    }
  }).then(function (res) {
    console.log(res);
    res = JSON.parse(res);

    if (res.code == 0) {
      //注册成功，跳转登录页面
      var rrr = confirm("注册成功，请登录！");

      if (rrr) {
        location.href = '../views/denglu.html';
      }
    } else if (res.code == 1) {
      var lose = "用户名已被占用啦！，请重新输入";
      confirm(lose);
    }
  });
};