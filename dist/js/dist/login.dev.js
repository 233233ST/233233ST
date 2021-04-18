"use strict";

var username = document.querySelector("#username"),
    password = document.querySelector("#password"),
    form = document.querySelector(".form-horizontal");
console.log(form), form.onsubmit = function () {
  window.event.preventDefault(), pAjax({
    type: "post",
    url: "../api/login.php",
    data: {
      username: username.value,
      password: password.value
    }
  }).then(function (e) {
    if (console.log(e), 1 == (e = JSON.parse(e)).code) {
      setCookie("login", username.value);
      var o = localStorage.getItem("url");
      if (o) location.href = o, localStorage.removeItem("url");else confirm("登录成功！");

      if (rrr) {
        location.href = "../views/index.html";
      }
    }
  });
};