"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var list = document.querySelector(".list");
var page = document.querySelector(".page");
var defaultInfo = {
  len: 20,
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
  new Pagination(page, {
    pageInfo: {
      pagenum: 1,
      pagesize: defaultInfo.len,
      total: res.total,
      totalpage: Math.ceil(res.total / defaultInfo.len)
    },
    textInfo: {
      first: "首页",
      prev: "上一页",
      list: "",
      next: "下一页",
      last: "最后一页"
    },
    change: function change(num) {
      defaultInfo.num = num;
      getData();
      scrollTo(0, 0);
    }
  });
});

function getData() {
  return _getData.apply(this, arguments);
}

function _getData() {
  _getData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var res;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return pAjax({
              url: "../api/getData.php",
              data: {
                start: defaultInfo.num,
                len: defaultInfo.len
              }
            });

          case 2:
            res = _context.sent;
            res = JSON.parse(res);
            renderHtml(res.list);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getData.apply(this, arguments);
}

function renderHtml(data) {
  var str = "";
  data.forEach(function (item, index) {
    str += " <li class=\"list-item\">\n        <div class=\"title\">\n            <ol class=\"breadcrumb\">\n                <li><a href=\"#\">".concat(item.cat_one_id, "</a></li>\n                <li><a href=\"#\">").concat(item.cat_two_id, "</a></li>\n                <li class=\"active\">").concat(item.cat_three_id, "</li>\n            </ol>\n        </div>\n        <div class=\"row\">\n            <div>\n                <div class=\"thumbnail\">\n                    <img src=\"").concat(item.goods_big_logo, "\"\n                        alt=\"...\">\n                    <div class=\"caption\">\n                        <h3>").concat(item.goods_name, "</h3>\n                        <div class=\"price\">\n                            <i class=\"glyphicon glyphicon-yen\"></i>\n                            <span>").concat(item.goods_price, "</span>\n                        </div>\n                        <p>\n                            <a href=\"./car.html\" class=\"btn btn-primary\" role=\"button\">\u67E5\u770B\u8D2D\u7269\u8F66</a>\n                            <a href=\"./detail.html?id=").concat(item.goods_id, "\" class=\"btn btn-info\" role=\"button\">\u67E5\u770B\u5546\u54C1\u8BE6\u60C5</a>\n                        </p>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </li>");
  });
  list.innerHTML = str;
}