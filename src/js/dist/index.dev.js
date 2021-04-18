"use strict";

$(document).scroll(function () {
  var h = $(document).scrollTop();
});
$("#zhiding").click(function () {
  console.log(1); // $(document).scrollTop(0);

  $("html").animate({
    scrollTop: 0
  }, 1000);
});
var list = document.querySelector(".xuanran");
var defaultInfo = {
  len: 12,
  num: 1
};
pAjax({
  url: "../api/getData.php",
  data: {
    start: defaultInfo.num,
    len: defaultInfo.len
  }
}).then(function (res) {
  res = JSON.parse(res);
  renderHtml(res.list);
  console.log("111");
}); // async function getData() {
//     let res = await pAjax({
//         url: "../src/api/getData.php",
//         data: {
//             start: defaultInfo.num,
//             len: defaultInfo.len,
//         },
//     });
//     res = JSON.parse(res);
//     renderHtml(res.list);
//     console.log(res.list);
// }

function renderHtml(data) {
  var str = "";
  data.forEach(function (item, index) {
    str += " <li class=\"list-item\">\n        <div class=\"title\">\n            <ol class=\"breadcrumb\">\n                <li><a href=\"#\">".concat(item.cat_one_id, "</a></li>\n                <li><a href=\"#\">").concat(item.cat_two_id, "</a></li>\n                <li class=\"active\">").concat(item.cat_three_id, "</li>\n            </ol>\n        </div>\n        <div class=\"row\">\n            <div>\n                <div class=\"thumbnail\">\n                    <img src=\"").concat(item.goods_big_logo, "\"\n                        alt=\"...\">\n                    <div class=\"caption\">\n                        <h3>").concat(item.goods_name, "</h3>\n                        <div class=\"price\">\n                            <i class=\"glyphicon glyphicon-yen\"></i>\n                            <span>").concat(item.goods_price, "</span>\n                        </div>\n                        <p>\n                            <a href=\"./car.html\" class=\"btn btn-primary\" role=\"button\">\u67E5\u770B\u8D2D\u7269\u8F66</a>\n                            <a href=\"./detail.html?id=").concat(item.goods_id, "\" class=\"btn btn-info\" role=\"button\">\u67E5\u770B\u5546\u54C1\u8BE6\u60C5</a>\n                        </p>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </li>");
  });
  list.innerHTML = str;
}