"use strict";

function Pagination(ele, options) {
  if (!ele) {
    throw new Error('方法必须传递参数，第一个为dom元素，第二个为对象');
  }

  this.ele = ele; // 把用户传递进来的信息保存一下

  this.options = options || {}; // 准备一些分页信息

  this["default"] = {
    pageInfo: {
      pagenum: 1,
      // 当前页数
      pagesize: 10,
      // 每页多少条
      total: 1000,
      // 数据总数
      totalpage: 100 // 页码总数

    },
    textInfo: {
      first: 'first',
      prev: 'prev',
      list: '',
      next: 'next',
      last: 'last'
    }
  }; // 当页码发生改变的时候就执行这个函数

  this.change = this.options.change || function () {}; // 提前准备一个变量，保存 list 里面的元素


  this.list = null; // 调用过的入口函数

  this.init();
}

Pagination.prototype.init = function () {
  this.setDefault();
  this.setStyle();
  this.dongcidaci();
}; // 使用用户传递的信息替换我自己的信息


Pagination.prototype.setDefault = function () {
  if (this.options.pageInfo) {
    for (var attr in this.options.pageInfo) {
      this["default"].pageInfo[attr] = this.options.pageInfo[attr];
    }
  }

  if (this.options.textInfo) {
    for (var _attr in this.options.textInfo) {
      this["default"].textInfo[_attr] = this.options.textInfo[_attr];
    }
  }
}; // 给大盒子设置样式


Pagination.prototype.setStyle = function () {
  this.ele.innerHTML = '';
  setCss(this.ele, {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }); // 设置完样式就添加元素

  this.createEle(); // 添加列表

  this.creteList(); // 添加文本框

  this.go(); // 禁用的判断

  this.isDis(); // 动过以后要执行函数

  this.change(this["default"].pageInfo.pagenum);
}; // 添加上一页下一页首页末页列表标签到 this.ele 里面


Pagination.prototype.createEle = function () {
  for (var attr in this["default"].textInfo) {
    var div = document.createElement('div');
    div.className = attr;

    if (attr === 'list') {
      this.list = div;
      setCss(div, {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      });
    } else {
      setCss(div, {
        border: '1px solid #333',
        padding: '0 5px',
        margin: '0 5px'
      });
    }

    div.innerHTML = this["default"].textInfo[attr];
    this.ele.appendChild(div);
  }
}; // 设置页码


Pagination.prototype.creteList = function () {
  var pagenum = this["default"].pageInfo.pagenum;
  var totalpage = this["default"].pageInfo.totalpage;

  if (totalpage <= 9) {
    // 小于九个直接渲染
    for (var i = 1; i <= this["default"].pageInfo.totalpage; i++) {
      var p = this.crealeP(i);
      this.list.appendChild(p);
    }
  } else {
    // 大于九个分成几个步骤来渲染
    if (pagenum < 5) {
      // 1 2 3 4 5 ... 99 100
      for (var _i = 1; _i <= 5; _i++) {
        this.list.appendChild(this.crealeP(_i));
      }

      var span = document.createElement('span');
      span.innerHTML = '...';
      this.list.appendChild(span);

      for (var _i2 = totalpage - 1; _i2 <= totalpage; _i2++) {
        this.list.appendChild(this.crealeP(_i2));
      }
    } else if (pagenum === 5) {
      // 1 2 3 4 5 6 7 ... 99 100
      for (var _i3 = 1; _i3 <= 7; _i3++) {
        this.list.appendChild(this.crealeP(_i3));
      }

      var _span = document.createElement('span');

      _span.innerHTML = '...';
      this.list.appendChild(_span);

      for (var _i4 = totalpage - 1; _i4 <= totalpage; _i4++) {
        this.list.appendChild(this.crealeP(_i4));
      }
    } else if (pagenum > 5 && pagenum < totalpage - 4) {
      for (var _i5 = 1; _i5 <= 2; _i5++) {
        this.list.appendChild(this.crealeP(_i5));
      }

      var _span2 = document.createElement('span');

      _span2.innerHTML = '...';
      this.list.appendChild(_span2);

      for (var _i6 = pagenum - 2; _i6 <= pagenum + 2; _i6++) {
        this.list.appendChild(this.crealeP(_i6));
      }

      var span2 = document.createElement('span');
      span2.innerHTML = '...';
      this.list.appendChild(span2);

      for (var _i7 = totalpage - 1; _i7 <= totalpage; _i7++) {
        this.list.appendChild(this.crealeP(_i7));
      }
    } else if (pagenum === totalpage - 4) {
      for (var _i8 = 1; _i8 <= 2; _i8++) {
        this.list.appendChild(this.crealeP(_i8));
      }

      var _span3 = document.createElement('span');

      _span3.innerHTML = '...';
      this.list.appendChild(_span3);

      for (var _i9 = totalpage - 6; _i9 <= totalpage; _i9++) {
        this.list.appendChild(this.crealeP(_i9));
      }
    } else if (pagenum > totalpage - 4) {
      for (var _i10 = 1; _i10 <= 2; _i10++) {
        this.list.appendChild(this.crealeP(_i10));
      }

      var _span4 = document.createElement('span');

      _span4.innerHTML = '...';
      this.list.appendChild(_span4);

      for (var _i11 = totalpage - 4; _i11 <= totalpage; _i11++) {
        this.list.appendChild(this.crealeP(_i11));
      }
    }
  }
}; // 提取了一个专门用来创建 li 的函数


Pagination.prototype.crealeP = function (i) {
  // i 形参就是要拿到循环中的 i 我好渲染文字
  // 和当前页面进行比较
  var p = document.createElement('p');
  p.innerHTML = i;
  setCss(p, {
    border: '1px solid #333',
    margin: '0 5px',
    padding: '0 5px'
  });

  if (i === this["default"].pageInfo.pagenum) {
    setCss(p, {
      backgroundColor: 'orange'
    });
  }

  return p;
}; // 设置文本款和按钮


Pagination.prototype.go = function () {
  var inp = document.createElement('input');
  var btn = document.createElement('button');
  setCss(inp, {
    outline: 'none',
    width: '50px',
    height: '20px'
  });
  inp.value = this["default"].pageInfo.pagenum;
  inp.type = 'number';
  inp.setAttribute('min', '1');
  inp.setAttribute('max', this["default"].pageInfo.totalpage);
  setCss(btn, {
    outline: 'none',
    width: '30px',
    height: '24px',
    marginLeft: '5px'
  });
  btn.innerHTML = 'go';
  this.ele.appendChild(inp);
  this.ele.appendChild(btn);
}; // 判断一下禁用


Pagination.prototype.isDis = function () {
  if (this["default"].pageInfo.pagenum === 1) {
    this.ele.children[0].style.backgroundColor = '#ccc';
    this.ele.children[1].style.backgroundColor = '#ccc';
  }

  if (this["default"].pageInfo.pagenum === this["default"].pageInfo.totalpage) {
    this.ele.children[3].style.backgroundColor = '#ccc';
    this.ele.children[4].style.backgroundColor = '#ccc';
  }
}; // 动起来


Pagination.prototype.dongcidaci = function () {
  var _this = this;

  // 事件委托来做
  this.ele.addEventListener('click', function (e) {
    e = e || window.event;
    var target = e.target;

    if (target.className === 'first' && _this["default"].pageInfo.pagenum !== 1) {
      _this["default"].pageInfo.pagenum = 1;

      _this.setStyle();
    }

    if (target.className === 'prev' && _this["default"].pageInfo.pagenum !== 1) {
      _this["default"].pageInfo.pagenum--;

      _this.setStyle();
    }

    if (target.className === 'next' && _this["default"].pageInfo.pagenum !== _this["default"].pageInfo.totalpage) {
      _this["default"].pageInfo.pagenum++;

      _this.setStyle();
    }

    if (target.className === 'last' && _this["default"].pageInfo.pagenum !== _this["default"].pageInfo.totalpage) {
      _this["default"].pageInfo.pagenum = _this["default"].pageInfo.totalpage;

      _this.setStyle();
    }

    if (target.nodeName === 'P' && target.innerHTML - 0 !== _this["default"].pageInfo.pagenum) {
      _this["default"].pageInfo.pagenum = target.innerHTML - 0;

      _this.setStyle();
    }

    if (target.nodeName === 'BUTTON' && target.previousElementSibling.value - 0 !== _this["default"].pageInfo.pagenum) {
      _this["default"].pageInfo.pagenum = target.previousElementSibling.value - 0;

      _this.setStyle();
    }
  });
};

function setCss(ele, options) {
  for (var attr in options) {
    ele.style[attr] = options[attr];
  }
}