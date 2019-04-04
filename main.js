/********************Load画面**************************/
setTimeout(function(){
    wload.classList.remove('active')
},1000)
setTimeout(function(){aaa()},777)

/********************滚动条**************************/
window.onscroll = function(sc){
    if (window.scrollY > 0) { topnav.classList.add('active') }
    else{ topnav.classList.remove('active') }
aaa()
}

function animate(time) {
    requestAnimationFrame(animate);
    TWEEN.update(time);
}
requestAnimationFrame(animate);

let cad = document.querySelectorAll('nav.nav > ul > li > a')
for(i=0; i<cad.length; i++){
    cad[i].onclick = function(cl){
        cl.preventDefault()
        let a = cl.currentTarget
        let href = a.getAttribute('href')
        let ele = document.querySelector(href)
        let top = ele.offsetTop
        let targettop = top -78
        let wtop = window.scrollY
        let s = targettop - wtop
        var coords = { y: wtop }; 
        var t = Math.abs((s/100)*300)
        if(t>1000){t=1000}
        var tween = new TWEEN.Tween(coords)
            .to( { y: targettop }, t)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onUpdate(function(){window.scrollTo(0,coords.y)})
            .start();
    }
}

/********************导航栏**************************/
let ats = document.getElementsByClassName('subtarget')
for(let i=0; i<ats.length; i++){
    ats[i].onmouseenter = function(me){
        me.currentTarget.classList.add('active')
    }
    ats[i].onmouseleave = function(ml){
        ml.currentTarget.classList.remove('active')
    }
}
function aaa(){
    let stags = document.querySelectorAll('[data-x]')
    let minindex = 0
    let mintop = stags[minindex].offsetTop
    for(let i=1; i<stags.length; i++){
        let divtop = stags[i].offsetTop
        if(Math.abs(divtop - window.scrollY) < Math.abs(mintop - window.scrollY)){
        minindex = i
        }
    }
    stags[minindex].classList.remove('ass')
    let stagsy = document.querySelectorAll('[data-y]')
    if(minindex === 1){
        for( let n=0; n<stagsy.length; n++){stagsy[n].classList.remove('pro')}
    }
    let id = stags[minindex].id
    let a = document.querySelector('a[href="#' + id + '"]')
    let li = a.parentNode
    let allli = li.parentNode.children
    for( i=0; i<allli.length; i++ ){
        allli[i].classList.remove('lighthigh')
    }
    li.classList.add('lighthigh')
}

/*********************轮播控制***************************/
let n
初始化()
var timeID = setInterval( () => {
    //cur($(`.box > img:nth-child(${(n+2)%3+1})`))
    //ready($(`.box > img:nth-child(${(n)%3+1})`))
    //end($(`.box > img:nth-child(${(n+1)%3+1})`))
    end($(`.box > img:nth-child(${k(n)})`))
        .one(`transitionend`, (k) =>{ready($(k.currentTarget))})
    cur($(`.box > img:nth-child(${k(n+1)})`))
    n++
} , 3000)

$('.yanshi > .box').on('mouseenter',function () {
    window.clearInterval(timeID)
})

$('.yanshi > .box').on('mouseleave',function () {
    timeID = setInterval( () => {
        //cur($(`.box > img:nth-child(${(n+2)%3+1})`))
        //ready($(`.box > img:nth-child(${(n)%3+1})`))
        //end($(`.box > img:nth-child(${(n+1)%3+1})`))
        end($(`.box > img:nth-child(${k(n)})`))
            .one(`transitionend`, (k) =>{ready($(k.currentTarget))})
        cur($(`.box > img:nth-child(${k(n+1)})`))
        n++
    } , 3000)
})

$(`.yanshi > button`).on('click',function(i){
    n = i.currentTarget.id
    end($(`.box > img.cur`))
        .one(`transitionend`, (k) =>{ready($(k.currentTarget))})
    cur($(`.box > img:nth-child(${k(n)})`))
})

function k(n){
    if(n > 3){
        n = n%3
        if (n === 0) {
            n = 3
        }
    }
    return n
}
function cur(node){
    return node.removeClass('end ready').addClass('cur')
}
function end(node){
    return node.removeClass('cur ready').addClass('end')
}
function ready(node){
    return node.removeClass('end cur').addClass('ready')
}
function 初始化(){
    n = 1
    cur($(`.box > img:nth-child(1)`))
    ready($(`.box > img:nth-child(2)`))
    ready($(`.box > img:nth-child(3)`))
}