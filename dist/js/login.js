let username = document.querySelector("#username");
let password = document.querySelector("#password");
let form = document.querySelector(".form-horizontal");
console.log(form);

form.onsubmit = function () {
    let e = window.event;
    e.preventDefault();
    pAjax({
        type: 'post',
        url: '../api/login.php',
        data: {
            username: username.value,
            password: password.value
        }
    }).then(res => {
        console.log(res);
        res = JSON.parse(res);
        let tips = document.querySelector(".tips");
        if (res.code == 0) {
            tips.style.display = "block";
            return;
        }
        if (res.code == 1) {
            // 登录成功存储 登录的状态
            setCookie('login', username.value);
            // 跳转页面 如果从购物车过来的时候登录成功去购物车页面
            // 否则就去到首页
            let url = localStorage.getItem('url');
            let rrr = confirm("登录成功！");
            if (url) {
                location.href = url;
                // 登录成功的时候把url的这个localstorage值清除
                localStorage.removeItem('url');
            } else if (rrr) {
                location.href = '../index.html';

            }
        }
    })
}