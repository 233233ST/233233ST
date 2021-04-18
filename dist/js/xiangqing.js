$(document).scroll(() => {
    let h = $(document).scrollTop();
});

$("#zhiding").click(() => {
    // $(document).scrollTop(0);
    $("html").animate({
        scrollTop: 0
    }, 1000);

});

// 打开详情页的时候先查看是否有携带id参数
// 如果没有id参数的时候 跳转到列表
// 如果有id参数的时候 根据id去获取对象的数据 渲染
let reg = /id=(\d+)/;
if (!reg.test(location.search)) {
    location.href = "../index.html";
}
// exec() 捕获字符串中满足正则的数据
// 以数组的形式返回
// 索引为0 的位置 得到就是满足正则条件的字符串
// 索引为1 的位置 满足正则条件 圆括号中的字符
let id = reg.exec(location.search)[1];
console.log(id);

let xiangqing = document.querySelector("#xiangqing");
console.log(xiangqing);
// 根据id获取数据
pAjax({
    url: "../api/xiangqing.php",
    data: {
        id: id
    },
}).then((res) => {
    res = JSON.parse(res);
    renderHtml(res.detail);
    console.log(res);
    new Enlarge('#xiangqing')
});

function renderHtml(item) {
    // return
    xiangqing.innerHTML = `<div class="xiangqing">
    <p class="name">${item.goods_name}</p>
    <div class="bigbox">
        <div class="left_box">
            <div id="boxx">
                <div class="show">
                    <img src="../images/${item.goods_logo}" />
                    <div class="mask"></div>
                </div>
                <div class="list">
                    <p id="p1" class="active">
                        <img midelImg="../images/${item.goods_imgmin}" bigImg="../images/${item.goods_imgmin}" src="../images/${item.goods_imgmin}" />
                    </p>
                    <p id="p1">
                        <img midelImg="../images/${item.goods_imgmin2}" bigImg="../images/${item.goods_imgmin2}" src="../images/${item.goods_imgmin2}" />
                    </p>
                    <p id="p1">
                        <img midelImg="../images/${item.goods_imgmin3}" bigImg="../images/${item.goods_imgmin3}" src="../images/${item.goods_imgmin3}" />
                    </p>
                    <p id="p1">
                        <img midelImg="../images/${item.goods_imgmin4}" bigImg="../images/${item.goods_imgmin4}" src="../images/${item.goods_imgmin4}" />
                    </p>
                    <p id="p1">
                        <img midelImg="../images/${item.goods_imgmin5}" bigImg="../images/${item.goods_imgmin5}" src="../images/${item.goods_imgmin5}" />
                    </p>
                </div>
                <div class="enlarge"></div>
            </div>
        </div>

        <div class="right_box">
            <h2>
                <span>￥</span>
                <span class="jiage">${item.goods_price}</span>
                <span class="zhekou">（${item.goods_zhekou}）</span>
                <span class="￥">￥</span>
                <span class="yuanjia">${item.goods_yuanjia}</span>
            </h2>
            <h2>
                <p>商品评价：<img src="../images/wujiaoxing.png" alt="">
                    <span class="fenshu">5分</span>
                    <span class="renshu">0人评价</span>
                </p>

            </h2>
            <div class="gm_jr">
                <button id="goumai">立即购买</button>
                <button id="jiaru">加入购物车</button>
            </div>
            <img src="../images/fu.png" alt="">
            <h2>
                <p>
                    <span>0</span>
                    <span>人已购买</span>
                </p>

            </h2>
        </div>
    </div>


</div>`;

}

xiangqing.onclick = function () {
    let e = window.event;
    if (e.target.id == "goumai") {
        let login = getCookie("login");
        if (!login) {
            alert("没有登录请到登录页面进行登录");
            localStorage.setItem("url", location.href);
            location.href = "../views/denglu.html";
            return;
        } else {
            location.href = "../views/car.html";
        }
        // location.href = "./car.html";

        // alert("先加入购物车吧！")
    }

    if (e.target.id == "jiaru") {
        // alert('添加购物车')
        // 把当前这个条商品的goods_id ，用户名 ，goods_num 添加到 购物车的表
        // goods_id = id
        // userName = getCookie('login)  如果没有登录的时候 不能添加数据，提示进行登录
        // goods_num  判断这个用户对应的这个goods_id 是否已经存在，如果存在 goods_num++，如果不存在操作添加商品到购物车，其中 goods_num = 1

        let login = getCookie("login");
        if (!login) {
            alert("没有登录请到登录页面进行登录");
            localStorage.setItem("url", location.href);
            location.href = "../views/denglu.html";
            return;
        } else {
            alert("加入购物车成功")
        }
        // 发添加购物车的ajax请求
        pAjax({
            url: "../api/addCar.php",
            type: "post",
            data: {

                goods_id: id,
                userName: login,

            },
        }).then(function (res) {
            console.log(id);

            console.log(res);
        });
    };
};


// ----------------------------------放大镜--------------