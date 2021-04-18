"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Enlarge = /*#__PURE__*/function () {
  function Enlarge(ele) {
    _classCallCheck(this, Enlarge);

    this.ele = document.querySelector(ele);
    this.init();
  }

  _createClass(Enlarge, [{
    key: "init",
    value: function init() {
      var _this = this;

      // 获取需要用到的元素
      this.show = this.ele.querySelector(".show");
      this.showImg = this.show.querySelector("img");
      this.mask = this.show.querySelector(".mask");
      this.list = this.ele.querySelector(".list");
      this.p = this.list.querySelectorAll("p");
      this.enlarge = this.ele.querySelector(".enlarge"); // 给show盒子绑定鼠标移入事件

      this.show.onmouseover = function () {
        _this.mask.style.display = "block";
        _this.enlarge.style.display = "block"; // 应该设置 放大镜的盒子的宽高

        _this.setStyle();
      }; // 鼠标移出 show盒子的时候 隐藏 mask和enlarge


      this.show.onmouseout = function () {
        _this.mask.style.display = "none";
        _this.enlarge.style.display = "none";
      }; // 绑定show盒子中的移动事件


      this.show.onmousemove = function () {
        var e = window.event; // 光标在show盒子上的坐标轴
        // e.offsetX 得到是光标在mask盒子上的坐标轴
        // let x = e.offsetX;
        // let y = 0;

        _this.move(e);
      };

      this.p.forEach(function (item, index) {
        item.onclick = function () {
          console.log(123);

          _this.changeImg(item);
        };
      });
    }
  }, {
    key: "setStyle",
    value: function setStyle() {
      // mask盒子的大小/show盒子的大小 = 放大镜盒子的大小/放大镜背景图的大小
      // 放大镜大宽度 = 放大镜背景图的宽度 * mask盒子的宽度 / show盒子的宽度
      // '750px 1000px'  拿到750   1000
      var style = window.getComputedStyle(this.enlarge).backgroundSize;
      var bgx = parseInt(style.split(" ")[0]);
      var bgy = parseInt(style.split(" ")[1]);
      var maskW = this.mask.offsetWidth;
      var maskH = this.mask.offsetHeight;
      var showW = this.show.offsetWidth;
      var showH = this.show.offsetHeight;
      var width = 440;
      var height = 336;
      this.enlarge.style.width = width + "px";
      this.enlarge.style.height = height + "px";
    }
  }, {
    key: "move",
    value: function move(e) {
      var x = e.pageX - this.ele.offsetLeft - this.mask.offsetWidth / 2;
      var y = e.pageY - this.ele.offsetTop - this.mask.offsetHeight / 2;

      if (x <= 0) {
        x = 0;
      }

      if (y <= 0) {
        y = 0;
      }

      if (x >= this.show.offsetWidth - this.mask.offsetWidth) {
        x = this.show.offsetWidth - this.mask.offsetWidth;
      }

      if (y >= this.show.offsetHeight - this.mask.offsetHeight) {
        y = this.show.offsetHeight - this.mask.offsetHeight;
      }

      this.mask.style.left = x + "px";
      this.mask.style.top = y + "px"; // mask盒子移动的距 / show 盒子的大小 == 背景图移动的距离 / 背景图的大小
      // 背景图移动的距 = 背景图的大小 * mask盒子移动距离 / show盒子的大小
      // 背景图移动的距离 写在 background-postion:x y
      // background-postion 的取值 往左和往上移动 值为负数

      var style = window.getComputedStyle(this.enlarge).backgroundSize;
      var bgx = parseInt(style.split(" ")[0]);
      var bgy = parseInt(style.split(" ")[1]);
      var bpx = bgx * x / this.show.offsetWidth / 1.6;
      var bpy = bgy * y / this.show.offsetHeight; // 设置background-position的属性

      this.enlarge.style.backgroundPosition = "".concat(-bpx, "px ").concat(-bpy, "px");
    }
  }, {
    key: "changeImg",
    value: function changeImg(ele) {
      for (var i = 0; i < this.p.length; i++) {
        this.p[i].classList.remove("active");
      }

      ele.classList.add("active");
      var img = ele.querySelector("img"); // 更改show盒子中 img标签的图片路径

      this.showImg.setAttribute("src", img.getAttribute("midelimg"));
      var bigimgurl = img.getAttribute("bigimg"); // 更改放大镜的背景图

      this.enlarge.style.backgroundImage = "url('".concat(bigimgurl, "')");
    }
  }]);

  return Enlarge;
}();