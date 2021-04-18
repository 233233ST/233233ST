let username = document.querySelector("#username");
let phonenum = document.querySelector("#phonenum");
let password = document.querySelector("#password");
let form = document.querySelector("#form-horizontal");
console.log(form);

let shouji = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
phonenum.onblur = function () {
    var res1 = shouji.test(phonenum.value * 1);
    // let kong1 = phonenum.value = "";
    if (!res1) {
        let tips1 = document.querySelector(".tips1");
        tips1.style.display = "block"
        tips1.innerHTML = "手机号码不符合"
        return;
    } else {
        let tips1 = document.querySelector(".tips1");
        tips1.style.display = "block"
        tips1.innerHTML = "手机号码通过";
    }


};
let yonghuming = /^[0-9a-zA-Z\u4e00-\u9fa5_]{6,16}$/;
username.onblur = function () {
    var res2 = yonghuming.test(username.value);
    // let kong2 = phonenum.value = "";
    if (!res2) {
        let tips2 = document.querySelector(".tips2");
        tips2.style.display = "block"
        tips2.innerHTML = "用户名不符合"
        return;
    } else {
        let tips2 = document.querySelector(".tips2");
        tips2.style.display = "block"
        tips2.innerHTML = "用户名通过";
    }
}
let mima = /^[0-9a-zA-Z\u4e00-\u9fa5_]{3,16}$/;
password.onblur = function () {
    var res3 = mima.test(password.value);
    // let kong3 = phonenum.value = "";
    if (!res3) {
        let tips3 = document.querySelector(".tips3");
        tips3.style.display = "block"
        tips3.innerHTML = "密码不符合"
        return;
    } else {
        let tips3 = document.querySelector(".tips3");
        tips3.style.display = "block"
        tips3.innerHTML = "密码通过";
    }
}

form.onsubmit = function () {

    let e = window.event;
    e.preventDefault();
    pAjax({
        type: 'post',
        url: '../api/zhuce.php',
        data: {
            username: username.value,
            phonenum: phonenum.value,
            password: password.value
        }
    }).then(res => {
        console.log(res);
        res = JSON.parse(res);
        if (res.code == 0) {
            //注册成功，跳转登录页面
            let rrr = confirm("注册成功，请登录！");
            if (rrr) {
                location.href = '../views/denglu.html';
            }
        } else if (res.code == 1) {
            let lose = "用户名已被占用啦！，请重新输入";
            confirm(lose);
        }
    })
}