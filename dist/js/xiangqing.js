"use strict";

$(document).scroll(function () {
  var h = $(document).scrollTop();
});
$("#zhiding").click(function () {
  // $(document).scrollTop(0);
  $("html").animate({
    scrollTop: 0
  }, 1000);
}); // 打开详情页的时候先查看是否有携带id参数
// 如果没有id参数的时候 跳转到列表
// 如果有id参数的时候 根据id去获取对象的数据 渲染

var reg = /id=(\d+)/;

if (!reg.test(location.search)) {
  location.href = "../index.html";
} // exec() 捕获字符串中满足正则的数据
// 以数组的形式返回
// 索引为0 的位置 得到就是满足正则条件的字符串
// 索引为1 的位置 满足正则条件 圆括号中的字符


var id = reg.exec(location.search)[1];
console.log(id);
var xiangqing = document.querySelector("#xiangqing");
console.log(xiangqing); // 根据id获取数据

pAjax({
  url: "../api/xiangqing.php",
  data: {
    id: id
  }
}).then(function (res) {
  res = JSON.parse(res);
  renderHtml(res.detail);
  console.log(res);
  new Enlarge('#xiangqing');
});

function renderHtml(item) {
  // return
  xiangqing.innerHTML = "<div class=\"xiangqing\">\n    <p class=\"name\">".concat(item.goods_name, "</p>\n    <div class=\"bigbox\">\n        <div class=\"left_box\">\n            <div id=\"boxx\">\n                <div class=\"show\">\n                    <img src=\"../images/").concat(item.goods_logo, "\" />\n                    <div class=\"mask\"></div>\n                </div>\n                <div class=\"list\">\n                    <p id=\"p1\" class=\"active\">\n                        <img midelImg=\"../images/").concat(item.goods_imgmin, "\" bigImg=\"../images/").concat(item.goods_imgmin, "\" src=\"../images/").concat(item.goods_imgmin, "\" />\n                    </p>\n                    <p id=\"p1\">\n                        <img midelImg=\"../images/").concat(item.goods_imgmin2, "\" bigImg=\"../images/").concat(item.goods_imgmin2, "\" src=\"../images/").concat(item.goods_imgmin2, "\" />\n                    </p>\n                    <p id=\"p1\">\n                        <img midelImg=\"../images/").concat(item.goods_imgmin3, "\" bigImg=\"../images/").concat(item.goods_imgmin3, "\" src=\"../images/").concat(item.goods_imgmin3, "\" />\n                    </p>\n                    <p id=\"p1\">\n                        <img midelImg=\"../images/").concat(item.goods_imgmin4, "\" bigImg=\"../images/").concat(item.goods_imgmin4, "\" src=\"../images/").concat(item.goods_imgmin4, "\" />\n                    </p>\n                    <p id=\"p1\">\n                        <img midelImg=\"../images/").concat(item.goods_imgmin5, "\" bigImg=\"../images/").concat(item.goods_imgmin5, "\" src=\"../images/").concat(item.goods_imgmin5, "\" />\n                    </p>\n                </div>\n                <div class=\"enlarge\"></div>\n            </div>\n        </div>\n\n        <div class=\"right_box\">\n            <h2>\n                <span>\uFFE5</span>\n                <span class=\"jiage\">").concat(item.goods_price, "</span>\n                <span class=\"zhekou\">\uFF08").concat(item.goods_zhekou, "\uFF09</span>\n                <span class=\"\uFFE5\">\uFFE5</span>\n                <span class=\"yuanjia\">").concat(item.goods_yuanjia, "</span>\n            </h2>\n            <h2>\n                <p>\u5546\u54C1\u8BC4\u4EF7\uFF1A<img src=\"../images/wujiaoxing.png\" alt=\"\">\n                    <span class=\"fenshu\">5\u5206</span>\n                    <span class=\"renshu\">0\u4EBA\u8BC4\u4EF7</span>\n                </p>\n\n            </h2>\n            <div class=\"gm_jr\">\n                <button id=\"goumai\">\u7ACB\u5373\u8D2D\u4E70</button>\n                <button id=\"jiaru\">\u52A0\u5165\u8D2D\u7269\u8F66</button>\n            </div>\n            <img src=\"../images/fu.png\" alt=\"\">\n            <h2>\n                <p>\n                    <span>0</span>\n                    <span>\u4EBA\u5DF2\u8D2D\u4E70</span>\n                </p>\n\n            </h2>\n        </div>\n    </div>\n\n\n</div>");
}

xiangqing.onclick = function () {
  var e = window.event;

  if (e.target.id == "goumai") {
    var login = getCookie("login");

    if (!login) {
      alert("没有登录请到登录页面进行登录");
      localStorage.setItem("url", location.href);
      location.href = "../views/denglu.html";
      return;
    } else {
      location.href = "../views/car.html";
    } // location.href = "./car.html";
    // alert("先加入购物车吧！")

  }

  if (e.target.id == "jiaru") {
    // alert('添加购物车')
    // 把当前这个条商品的goods_id ，用户名 ，goods_num 添加到 购物车的表
    // goods_id = id
    // userName = getCookie('login)  如果没有登录的时候 不能添加数据，提示进行登录
    // goods_num  判断这个用户对应的这个goods_id 是否已经存在，如果存在 goods_num++，如果不存在操作添加商品到购物车，其中 goods_num = 1
    var _login = getCookie("login");

    if (!_login) {
      alert("没有登录请到登录页面进行登录");
      localStorage.setItem("url", location.href);
      location.href = "../views/denglu.html";
      return;
    } else {
      alert("加入购物车成功");
    } // 发添加购物车的ajax请求


    pAjax({
      url: "../api/addCar.php",
      type: "post",
      data: {
        goods_id: id,
        userName: _login
      }
    }).then(function (res) {
      console.log(id);
      console.log(res);
    });
  }

  ;
}; // ----------------------------------放大镜--------------