class Enlarge {
    constructor(ele) {
        this.ele = document.querySelector(ele);
        this.init();
    }
    init() {
        // 获取需要用到的元素
        this.show = this.ele.querySelector(".show");
        this.showImg = this.show.querySelector("img");
        this.mask = this.show.querySelector(".mask");

        this.list = this.ele.querySelector(".list");
        this.p = this.list.querySelectorAll("p");

        this.enlarge = this.ele.querySelector(".enlarge");

        // 给show盒子绑定鼠标移入事件
        this.show.onmouseover = () => {
            this.mask.style.display = "block";
            this.enlarge.style.display = "block";

            // 应该设置 放大镜的盒子的宽高
            this.setStyle();
        };

        // 鼠标移出 show盒子的时候 隐藏 mask和enlarge
        this.show.onmouseout = () => {
            this.mask.style.display = "none";
            this.enlarge.style.display = "none";
        };

        // 绑定show盒子中的移动事件
        this.show.onmousemove = () => {
            let e = window.event;

            // 光标在show盒子上的坐标轴
            // e.offsetX 得到是光标在mask盒子上的坐标轴
            // let x = e.offsetX;
            // let y = 0;
            this.move(e);
        };

        this.p.forEach((item, index) => {
            item.onclick = () => {
                console.log(123)
                this.changeImg(item);
            };
        });
    }
    setStyle() {
        // mask盒子的大小/show盒子的大小 = 放大镜盒子的大小/放大镜背景图的大小
        // 放大镜大宽度 = 放大镜背景图的宽度 * mask盒子的宽度 / show盒子的宽度
        // '750px 1000px'  拿到750   1000
        let style = window.getComputedStyle(this.enlarge).backgroundSize;
        let bgx = parseInt(style.split(" ")[0]);
        let bgy = parseInt(style.split(" ")[1]);

        let maskW = this.mask.offsetWidth;
        let maskH = this.mask.offsetHeight;

        let showW = this.show.offsetWidth;
        let showH = this.show.offsetHeight;

        let width = 440;
        let height = 336;

        this.enlarge.style.width = width + "px";
        this.enlarge.style.height = height + "px";
    }
    move(e) {
        let x = e.pageX - this.ele.offsetLeft - this.mask.offsetWidth / 2;
        let y = e.pageY - this.ele.offsetTop - this.mask.offsetHeight / 2;

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
        this.mask.style.top = y + "px";

        // mask盒子移动的距 / show 盒子的大小 == 背景图移动的距离 / 背景图的大小
        // 背景图移动的距 = 背景图的大小 * mask盒子移动距离 / show盒子的大小
        // 背景图移动的距离 写在 background-postion:x y
        // background-postion 的取值 往左和往上移动 值为负数
        let style = window.getComputedStyle(this.enlarge).backgroundSize;
        let bgx = parseInt(style.split(" ")[0]);
        let bgy = parseInt(style.split(" ")[1]);

        let bpx = (bgx * x) / this.show.offsetWidth / 1.6;
        let bpy = (bgy * y) / this.show.offsetHeight;

        // 设置background-position的属性
        this.enlarge.style.backgroundPosition = `${-bpx}px ${-bpy}px`;
    }
    changeImg(ele) {
        for (let i = 0; i < this.p.length; i++) {
            this.p[i].classList.remove("active");
        }
        ele.classList.add("active");
        let img = ele.querySelector("img");

        // 更改show盒子中 img标签的图片路径
        this.showImg.setAttribute("src", img.getAttribute("midelimg"));

        const bigimgurl = img.getAttribute(
            "bigimg"
        )

        // 更改放大镜的背景图
        this.enlarge.style.backgroundImage = `url('${bigimgurl}')`;

    }
}