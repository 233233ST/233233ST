"use strict";

$(document).scroll(function () {
  var h = $(document).scrollTop();
});
$("#zhiding").click(function () {
  // $(document).scrollTop(0);
  $("html").animate({
    scrollTop: 0
  }, 1000);
}); // let yonghuming = document.querySelector("#yonghuming");
// console.log(yonghuming);
// let login = getCookie("login");
// console.log(login);
// yonghuming.innerHTML = login;

console.log(111);
var list = document.querySelector(".xuanran");
console.log(list);
var defaultInfo = {
  len: 12,
  num: 1
};
pAjax({
  url: "./api/getData.php",
  data: {
    start: defaultInfo.num,
    len: defaultInfo.len
  }
}).then(function (res) {
  res = JSON.parse(res);
  renderHtml(res.list);
  console.log(res);
  var li = document.querySelectorAll(".xuanran .box .btn"); // let box = document.querySelectorAll(".box")

  li.forEach(function (item, index) {
    item.onclick = function () {
      // console.log();
      var id = item.getAttribute("data_id"); // console.log(item);

      location.href = "./views/xiangqing.html?id=" + id;
    };
  });
});

function renderHtml(data) {
  var str = "";
  data.forEach(function (item) {
    str += " <div class=\"box\">\n        <div class=\"tu\">\n            <img src=\"./images/".concat(item.goods_logo, "\" alt=\"\">\n        </div>\n        <a href=\"\" class=\"name\">").concat(item.goods_name, "\n        </a>\n        <h2>\n            <span>\uFFE5</span>\n            <span class=\"jiage\">").concat(item.goods_price, "</span>\n            <span class=\"yuanjia\">\uFFE5").concat(item.goods_yuanjia, "</span>\n            <span class=\"zhekou\">\uFF08").concat(item.goods_zhekou, "\uFF09</span>\n            <span>\u65B0\u54C1\u4E0A\u5E02</span>\n            <button data_id=").concat(item.goods_id, " class=\"btn\">\u7ACB\u5373\u8D2D\u4E70</button>\n        </h2>\n    </div>");
  });
  list.innerHTML = str;
}