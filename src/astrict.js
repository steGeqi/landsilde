//单页长时间不操作就会自动退出

var lastTime = new Date().getTime()
var currentTime = new Date().getTime()
var timeOut = 60 * 60 * 1000

window.onload = function() {
    window.document.onmousedown = function() {
        localStorage.setItem("lastTime",new Date().getTime())
    }
};

function checkTimeout() {
    currentTime = new Date().getTime()		//更新当前时间
    lastTime = localStorage.getItem("lastTime");
    // console.log(currentTime - lastTime);
    // console.log(timeOut);
    if (currentTime - lastTime > timeOut) { //判断是否超时
        localStorage.removeItem('token');
        var url = window.location.href;
        var newUrl=url.match(/(\S*)#/);
        sessionStorage.clear()

        window.open('/login','_self');
    }
}


/* 定时器 间隔30秒检测是否长时间未操作页面 */
window.setInterval(checkTimeout, 30000);
