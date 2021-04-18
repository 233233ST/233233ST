"use strict";

var username = document.querySelector("#username");
var phonenum = document.querySelector("#phonenum");
var password = document.querySelector("#password");
var form = document.querySelector("#form-horizontal");
console.log(form);
var shouji = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;

phonenum.onblur = function () {
  var res1 = shouji.test(phonenum.value * 1); // let kong1 = phonenum.value = "";

  if (!res1) {
    var tips1 = document.querySelector(".tips1");
    tips1.style.display = "block";
    tips1.innerHTML = "手机号码不符合";
    return;
  } else {
    var _tips = document.querySelector(".tips1");

    _tips.style.display = "block";
    _tips.innerHTML = "手机号码通过";
  }
};

var yonghuming = /^[0-9a-zA-Z\u4e00-\u9fa5_]{6,16}$/;

username.onblur = function () {
  var res2 = yonghuming.test(username.value); // let kong2 = phonenum.value = "";

  if (!res2) {
    var tips2 = document.querySelector(".tips2");
    tips2.style.display = "block";
    tips2.innerHTML = "用户名不符合";
    return;
  } else {
    var _tips2 = document.querySelector(".tips2");

    _tips2.style.display = "block";
    _tips2.innerHTML = "用户名通过";
  }
};

var mima = /^[0-9a-zA-Z\u4e00-\u9fa5_]{3,16}$/;

password.onblur = function () {
  var res3 = mima.test(password.value); // let kong3 = phonenum.value = "";

  if (!res3) {
    var tips3 = document.querySelector(".tips3");
    tips3.style.display = "block";
    tips3.innerHTML = "密码不符合";
    return;
  } else {
    var _tips3 = document.querySelector(".tips3");

    _tips3.style.display = "block";
    _tips3.innerHTML = "密码通过";
  }
};

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