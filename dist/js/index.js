$(document).scroll(() => {
    let h = $(document).scrollTop();
});

$("#zhiding").click(() => {
    // $(document).scrollTop(0);
    $("html").animate({
        scrollTop: 0
    }, 1000);

});
// let yonghuming = document.querySelector("#yonghuming");
// console.log(yonghuming);
// let login = getCookie("login");
// console.log(login);
// yonghuming.innerHTML = login;

console.log(111);
let list = document.querySelector(".xuanran");
console.log(list);
let defaultInfo = {
    len: 12,
    num: 1,
};
pAjax({
    url: "./api/getData.php",
    data: {
        start: defaultInfo.num,
        len: defaultInfo.len,
    },
}).then((res) => {
    res = JSON.parse(res);
    renderHtml(res.list);
    console.log(res);
    let li = document.querySelectorAll(".xuanran .box .btn")
    // let box = document.querySelectorAll(".box")
    li.forEach(function (item, index) {
        item.onclick = function () {
            // console.log();
            let id = item.getAttribute("data_id");
            // console.log(item);
            location.href = "./views/xiangqing.html?id=" + id;
        }

    });
});

function renderHtml(data) {
    let str = "";
    data.forEach((item) => {
        str += ` <div class="box">
        <div class="tu">
            <img src="./images/${item.goods_logo}" alt="">
        </div>
        <a href="" class="name">${item.goods_name}
        </a>
        <h2>
            <span>￥</span>
            <span class="jiage">${item.goods_price}</span>
            <span class="yuanjia">￥${item.goods_yuanjia}</span>
            <span class="zhekou">（${item.goods_zhekou}）</span>
            <span>新品上市</span>
            <button data_id=${item.goods_id} class="btn">立即购买</button>
        </h2>
    </div>`;
    });

    list.innerHTML = str;
}