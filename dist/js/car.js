"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* 
    【1】 列表页中 点击查看购物车的时候 跳转到购物车页面
    【2】 详情页中 点击加入购物车 ，判断是否有的登录
    【3】 详情页查看购物车 的时候 跳转到购物车页面
        
        
        当你打开购物车页面的时候
        【1】需要判断 是否有登录
            +   有登录 直接显示购物车数据
            +   没有登录的时候跳转道登录页面（需要把当前页面的地址 存储在本地存储中） 进行登录

            +   登录页面登录成功的时候 需要获取本地存储中的url地址
        
        
    【4】能够打开购物车页面
        +   把购物车中的数据显示出来（按照用户名获取）  
        +   渲染数据
        +   点击 + - 删除的时候 操作购物车的数据
*/
// 判断是否有登录
var login = getCookie("login");

if (!login) {
  alert("没有登录请到登录页面进行登录");
  localStorage.setItem("url", location.href);
  location.href = "../views/denglu.html";
} // 获取当前用户名的 购物车中的数据 渲染到 页面

/* 
    描述对象：
        静态属性：
            car ：页面中一个名字
            login:用户名
        动态方法：
            init() 初始化，获取元素
            getData() 获取数据
            render() 渲染结构
            calculation() 计算总价 和 数量
            changeCount() 加减计算
            deleteData()
            clearData() 
*/


var Car = /*#__PURE__*/function () {
  function Car(ele, user) {
    _classCallCheck(this, Car);

    this.ele = document.querySelector(ele);
    this.user = user;
    this.init();
  }

  _createClass(Car, [{
    key: "init",
    value: function init() {
      var _this = this;

      this.panelBody = this.ele.querySelector(".panel-body");
      this.kind = this.ele.querySelector(".kind");
      this.countTotal = this.ele.querySelector(".countTotal");
      this.totalPrice = this.ele.querySelector(".totalPrice");
      this.allChecked = this.ele.querySelector("#allChecked");
      this.getData(); // 利用事件委托给购物车中的元素绑定点击事件

      this.ele.onclick = function () {
        var e = window.event; // 全选和单选

        if (e.target.id == "allChecked") {
          // 商品列表中的数据 前面的复选框的选上
          // 操作数据形式来进行选择的操作
          // 不能直接操作 数据库中的数据
          // 只能把对应数据存在本地 localstorage
          // console.log(this.res);
          if (e.target.checked) {
            _this.res.forEach(function (item) {
              item.is_select = "1";
            });
          } else {
            _this.res.forEach(function (item) {
              item.is_select = "0";
            });
          }
        } else if (e.target.className == "checked") {
          // console.log(e.target.checked);
          var id = e.target.getAttribute("index"); // if (e.target.checked) {
          //     this.res.forEach(item => {
          //         if (item.goods_id == id) {
          //             item.is_select = '1'
          //         }
          //     })
          // } else {
          //     this.res.forEach((item) => {
          //         if (item.goods_id == id) {
          //             item.is_select = "0";
          //         }
          //     });
          // }

          _this.res.forEach(function (item) {
            if (item.goods_id == id) {
              item.is_select = e.target.checked ? "1" : "0";
            }
          });
        }

        localStorage.setItem("data", JSON.stringify(_this.res));

        _this.render(); // 减少商品的数量


        if (e.target.classList.contains("reduce")) {
          // 发送一个ajax请求
          var _id = e.target.parentNode.getAttribute("index"); // 数量的判断


          var value = e.target.nextElementSibling.innerHTML * 1 - 1;

          _this.changeCount(_id, value);
        } // 增加商品数量


        if (e.target.classList.contains("add")) {
          var _id2 = e.target.parentNode.getAttribute("index");

          var _value = e.target.previousElementSibling.innerHTML * 1 + 1;

          _this.changeCount(_id2, _value);
        } // 删除商品


        if (e.target.classList.contains("del")) {
          var _id3 = e.target.getAttribute("index");

          _this.deleteData(_id3);
        } // 结算按钮
        // 先把本地存储中商品数据 is_select = 1的数据删除
        // 循环本地 数据  判断如果 这个条数据的is_select= 1
        // 把这条数据的id传递给后端 进行删除
        // 结算的是 被勾选的数据
        // 当这个数据被勾选之后 is_select = 1


        if (e.target.classList.contains('settlement')) {
          _this.res.forEach(function (item) {
            if (item.is_select == "1") {
              _this.deleteData(item.goods_id);
            }
          });
        }
      };
    }
  }, {
    key: "getData",
    value: function () {
      var _getData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var res;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return pAjax({
                  url: "../api/getCarData.php",
                  data: {
                    username: this.user
                  }
                });

              case 2:
                res = _context.sent;
                // 获取完数据之后就把数据存在本地
                localStorage.setItem("data", res); // 把数据 直接添加在this对象上
                // this.res = JSON.parse(res);

                this.render();

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getData() {
        return _getData.apply(this, arguments);
      }

      return getData;
    }()
  }, {
    key: "render",
    value: function render() {
      this.res = JSON.parse(localStorage.getItem("data"));
      this.calculation();
      var str = "";
      this.res.forEach(function (item, index) {
        str += "<div class=\"media\">\n                        <div class=\"media-left media-middle\">\n                            <label>\n                                <input index=\"".concat(item.goods_id, "\"\n                                    type=\"checkbox\"\n                                    class=\"checked\"\n                                    ").concat(item.is_select == "1" ? "checked" : "", "\n                                />\n                            </label>\n                            <a href=\"#\">\n                                <img\n                                    class=\"media-object\"\n                                    src=\"../images/").concat(item.goods_logo, "\"\n                                />\n                            </a>\n                        </div>\n                        <div class=\"media-body\">\n                            <div class=\"content\">\n                                <h4 class=\"media-heading\">\n                                   ").concat(item.goods_name, "\n                                </h4>\n                                <span\n                                    class=\"glyphicon glyphicon glyphicon-yen\"\n                                    aria-hidden=\"true\"\n                                >\n                                    ").concat(item.goods_price, "\n                                </span>\n                            </div>\n\n                            <div class=\"btn-group\" index=\"").concat(item.goods_id, "\">\n                                <button type=\"button\" ").concat(item.goods_num == 1 ? "disabled" : "", " class=\"btn btn-default reduce\">-</button>\n                                <button type=\"button\" class=\"btn btn-default\">").concat(item.goods_num, "</button>\n                                <button type=\"button\" class=\"btn btn-default add\">+</button>\n                            </div>\n\n                            <div class=\"total\">\n                                \u5C0F\u8BA1\uFF1A\n                                <span>\uFFE5").concat(item.goods_price * item.goods_num, "</span>\n                            </div>\n\n                            <button\n                                type=\"button\"\n                                class=\"close del\"\n                                index=\"").concat(item.goods_id, "\"\n                            >\n                                <span  class=\"del\" index=\"").concat(item.goods_id, "\">&times;</span>\n                            </button>\n                        </div>\n                    </div>");
      });
      this.panelBody.innerHTML = str;
    }
  }, {
    key: "calculation",
    value: function calculation() {
      // 商品的种类 （data数据的length）
      // console.log(this.res);
      this.kind.innerHTML = this.res.length; // 判断数据中的is_select 是否为1
      // 如果为1的时候 就把这个条商品的数量相加

      this.countTotal.innerHTML = this.res.reduce(function (pre, cur) {
        if (cur.is_select == "1") {
          return pre + cur.goods_num * 1;
        }

        return pre;
      }, 0); // 计算选中的总价格

      var total = this.res.reduce(function (pre, cur) {
        if (cur.is_select == "1") {
          return pre + cur.goods_price * cur.goods_num;
        }

        return pre;
      }, 0);
      this.totalPrice.innerHTML = "￥" + total.toFixed(2); // 当所有的数据的is_select 的值为1 的时候 应该让全选自动选上

      this.allChecked.checked = this.res.every(function (item) {
        return item.is_select == "1";
      });
    }
  }, {
    key: "changeCount",
    value: function () {
      var _changeCount = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id, value) {
        var res;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return pAjax({
                  url: "../api/updataCar.php",
                  data: {
                    username: this.user,
                    goods_id: id,
                    goods_num: value
                  }
                });

              case 2:
                res = _context2.sent;
                res = JSON.parse(res);

                if (res.code) {
                  this.res.forEach(function (item) {
                    item.goods_num = item.goods_id == id ? value : item.goods_num;
                  });
                }

                localStorage.setItem("data", JSON.stringify(this.res));
                this.render();

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function changeCount(_x, _x2) {
        return _changeCount.apply(this, arguments);
      }

      return changeCount;
    }()
  }, {
    key: "deleteData",
    value: function () {
      var _deleteData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {
        var res;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return pAjax({
                  url: "../api/deleteCar.php",
                  data: {
                    username: this.user,
                    goods_id: id
                  }
                });

              case 2:
                res = _context3.sent;
                // 当把数据库中的数据删除成功之后 需要更改一下本地存储的数据
                res = JSON.parse(res);

                if (res.code) {
                  this.res = this.res.filter(function (item) {
                    return item.goods_id != id;
                  });
                }

                localStorage.setItem("data", JSON.stringify(this.res));
                this.render();

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function deleteData(_x3) {
        return _deleteData.apply(this, arguments);
      }

      return deleteData;
    }()
  }]);

  return Car;
}();

new Car(".car", login);