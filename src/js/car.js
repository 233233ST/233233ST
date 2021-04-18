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
let login = getCookie("login");
if (!login) {
    alert("没有登录请到登录页面进行登录");
    localStorage.setItem("url", location.href);
    location.href = "../views/denglu.html";
}
// 获取当前用户名的 购物车中的数据 渲染到 页面

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
class Car {
    constructor(ele, user) {
        this.ele = document.querySelector(ele);
        this.user = user;

        this.init();
    }

    init() {
        this.panelBody = this.ele.querySelector(".panel-body");
        this.kind = this.ele.querySelector(".kind");
        this.countTotal = this.ele.querySelector(".countTotal");
        this.totalPrice = this.ele.querySelector(".totalPrice");
        this.allChecked = this.ele.querySelector("#allChecked");
        this.getData();

        // 利用事件委托给购物车中的元素绑定点击事件
        this.ele.onclick = () => {
            let e = window.event;
            // 全选和单选
            if (e.target.id == "allChecked") {
                // 商品列表中的数据 前面的复选框的选上
                // 操作数据形式来进行选择的操作
                // 不能直接操作 数据库中的数据
                // 只能把对应数据存在本地 localstorage
                // console.log(this.res);
                if (e.target.checked) {
                    this.res.forEach((item) => {
                        item.is_select = "1";
                    });
                } else {
                    this.res.forEach((item) => {
                        item.is_select = "0";
                    });
                }
            } else if (e.target.className == "checked") {
                // console.log(e.target.checked);
                let id = e.target.getAttribute("index");
                // if (e.target.checked) {
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

                this.res.forEach((item) => {
                    if (item.goods_id == id) {
                        item.is_select = e.target.checked ? "1" : "0";
                    }
                });
            }

            localStorage.setItem("data", JSON.stringify(this.res));
            this.render();

            // 减少商品的数量
            if (e.target.classList.contains("reduce")) {
                // 发送一个ajax请求
                let id = e.target.parentNode.getAttribute("index");
                // 数量的判断
                let value = e.target.nextElementSibling.innerHTML * 1 - 1;
                this.changeCount(id, value);
            }

            // 增加商品数量
            if (e.target.classList.contains("add")) {
                let id = e.target.parentNode.getAttribute("index");
                let value = e.target.previousElementSibling.innerHTML * 1 + 1;
                this.changeCount(id, value);
            }

            // 删除商品
            if (e.target.classList.contains("del")) {
                let id = e.target.getAttribute("index");
                this.deleteData(id);
            }

            // 结算按钮
            // 先把本地存储中商品数据 is_select = 1的数据删除
            // 循环本地 数据  判断如果 这个条数据的is_select= 1
            // 把这条数据的id传递给后端 进行删除

            // 结算的是 被勾选的数据
            // 当这个数据被勾选之后 is_select = 1
            if (e.target.classList.contains('settlement')) {
                this.res.forEach((item) => {
                    if (item.is_select == "1") {
                        this.deleteData(item.goods_id);
                    }
                });
            }
        };
    }

    async getData() {
        let res = await pAjax({
            url: "../api/getCarData.php",
            data: {
                username: this.user
            },
        });

        // 获取完数据之后就把数据存在本地
        localStorage.setItem("data", res);

        // 把数据 直接添加在this对象上
        // this.res = JSON.parse(res);

        this.render();
    }

    render() {
        this.res = JSON.parse(localStorage.getItem("data"));
        this.calculation();
        var str = "";
        this.res.forEach(function (item, index) {
            str += `<div class="media">
                        <div class="media-left media-middle">
                            <label>
                                <input index="${item.goods_id}"
                                    type="checkbox"
                                    class="checked"
                                    ${item.is_select == "1" ? "checked" : ""}
                                />
                            </label>
                            <a href="#">
                                <img
                                    class="media-object"
                                    src="../images/${item.goods_logo}"
                                />
                            </a>
                        </div>
                        <div class="media-body">
                            <div class="content">
                                <h4 class="media-heading">
                                   ${item.goods_name}
                                </h4>
                                <span
                                    class="glyphicon glyphicon glyphicon-yen"
                                    aria-hidden="true"
                                >
                                    ${item.goods_price}
                                </span>
                            </div>

                            <div class="btn-group" index="${item.goods_id}">
                                <button type="button" ${
                                    item.goods_num == 1 ? "disabled" : ""
                                } class="btn btn-default reduce">-</button>
                                <button type="button" class="btn btn-default">${
                                    item.goods_num
                                }</button>
                                <button type="button" class="btn btn-default add">+</button>
                            </div>

                            <div class="total">
                                小计：
                                <span>￥${
                                    item.goods_price * item.goods_num
                                }</span>
                            </div>

                            <button
                                type="button"
                                class="close del"
                                index="${item.goods_id}"
                            >
                                <span  class="del" index="${
                                    item.goods_id
                                }">&times;</span>
                            </button>
                        </div>
                    </div>`;
        });

        this.panelBody.innerHTML = str;
    }

    calculation() {
        // 商品的种类 （data数据的length）
        // console.log(this.res);
        this.kind.innerHTML = this.res.length;

        // 判断数据中的is_select 是否为1
        // 如果为1的时候 就把这个条商品的数量相加
        this.countTotal.innerHTML = this.res.reduce((pre, cur) => {
            if (cur.is_select == "1") {
                return pre + cur.goods_num * 1;
            }
            return pre;
        }, 0);

        // 计算选中的总价格
        let total = this.res.reduce((pre, cur) => {
            if (cur.is_select == "1") {
                return pre + cur.goods_price * cur.goods_num;
            }
            return pre;
        }, 0);

        this.totalPrice.innerHTML = "￥" + total.toFixed(2);

        // 当所有的数据的is_select 的值为1 的时候 应该让全选自动选上
        this.allChecked.checked = this.res.every((item) => {
            return item.is_select == "1";
        });
    }

    async changeCount(id, value) {
        let res = await pAjax({
            url: "../api/updataCar.php",
            data: {
                username: this.user,
                goods_id: id,
                goods_num: value,
            },
        });
        res = JSON.parse(res);
        if (res.code) {
            this.res.forEach((item) => {
                item.goods_num = item.goods_id == id ? value : item.goods_num;
            });
        }

        localStorage.setItem("data", JSON.stringify(this.res));
        this.render();
    }

    async deleteData(id) {
        let res = await pAjax({
            url: "../api/deleteCar.php",
            data: {
                username: this.user,
                goods_id: id,
            },
        });
        // 当把数据库中的数据删除成功之后 需要更改一下本地存储的数据
        res = JSON.parse(res);
        if (res.code) {
            this.res = this.res.filter((item) => {
                return item.goods_id != id;
            });
        }
        localStorage.setItem("data", JSON.stringify(this.res));
        this.render();
    }
}

new Car(".car", login);