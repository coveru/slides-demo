//初始化状态
let n
initialize()


//开始轮播
var timerId=setInterval(() => {
    makeLeave(getImage(n))
        .one('transitionend', (e) => {
            makeEnter($(e.currentTarget))
        })
    makeCurrent(getImage(n + 1))
    n += 1
}, 2000)

//添加监听（用户不看页面时停止轮播）
document.addEventListener('visibilitychange',function(){
    if(document.hidden){
        window.clearInterval(timerId)
    }else{
        timerId=setTimer()
    }
})







//添加鼠标事件
$('.window').on('mouseenter', function() {
    window.clearInterval(timerId)
  })

$('.window').on('mouseleave', function(){
    timerId=setTimer()
  })
















// 下面可以不看 
function x(n) {
    if (n > 5) {
        n = n % 5
        if (n === 0) {
            n = 5
        }
    }
    return n
}

function getImage(n) {
    return $(`.images > img:nth-child(${x(n)})`)
}
function initialize() {
    n = 1
    $(`.images > img:nth-child(${n})`).addClass('current')
        .siblings().addClass('enter')
}
function makeCurrent($node) {
    $node.removeClass('enter').addClass('current')
    return $node
}
function makeLeave($node) {
    $node.removeClass('current').addClass('leave')
    return $node
}
function makeEnter($node) {
    $node.removeClass('leave').addClass('enter')
    return $node
}
function setTimer(){
    return  setInterval(() => {
           makeLeave(getImage(n))
               .one('transitionend', (e) => {
                   makeEnter($(e.currentTarget))
               })
           makeCurrent(getImage(n + 1))
           n += 1
       }, 2000)
   }