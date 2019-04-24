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

$('.yanshi').on('mouseenter',function () {
    window.clearInterval(timeID)
})

$('.yanshi').on('mouseleave',function () {
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

document.addEventListener('visibilitychange',function(){
    if(document.hidden){
        window.clearInterval(timeID)
    }else{
        timeID = setInterval( () => {
            //cur($(`.box > img:nth-child(${(n+2)%3+1})`))
            //ready($(`.box > img:nth-child(${(n)%3+1})`))
            //end($(`.box > img:nth-child(${(n+1)%3+1})`))
            end($(`.box > img:nth-child(${k(n)})`))
                .one(`transitionend`, (k) =>{ready($(k.currentTarget))})
            cur($(`.box > img:nth-child(${k(n+1)})`))
            n++
        } , 3000)
    }
})

$(`.yanshi`).on('click','button',function(i){
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

/*********************留言栏***************************/
!function(){
    var view = document.querySelector('section.massage')

    var modle = {
        find : function(){
            var Massage = new AV.Query('Massage');
            return Massage.find()
        },
        save : function(name,content){
            var Massage = AV.Object.extend('Massage');
            var massage = new Massage();
            return massage.save({
                'name': name,
                'content': content
            })
        }
    }

    var control = {
        view : null,
        mas : null,
        from : null,
        init : function(view){
            this.view = view
            this.mas = view.querySelector('#massageList')
            this.from = view.querySelector('.massage > #postmas')
            this.initAV()
            this.loadmassages()
            this.bindEvents()
        },
        initAV : function(){
            var APP_ID = 'ntxaCMSoh5fq2ckzp5LgpS33-gzGzoHsz'
            var APP_KEY = 'rIEI9qygRxXr1BYmFiSGF2gI'
            AV.init({ appId: APP_ID , appKey: APP_KEY });
        },
        loadmassages : function(){
            modle.find().then( (massages) => {
                let array = massages.map((massages) => massages.attributes)
                array.forEach((item) => {
                    let li = document.createElement('li')
                    li.innerText = `${item.name}: ${item.content}`
                    this.mas.appendChild(li)
                });
            }).then(function(todos) {
                // 更新成功
            }, function (error) {
                // 异常处理
            });
        },
        bindEvents : function(){
            this.from.addEventListener('submit', (s) => {
                s.preventDefault()
                this.save.call()
            })
        },
        save : function(){
            var content = this.from.querySelector('input[name=content]').value
            var name = this.from.querySelector('input[name=name]').value
            modle.save(name,content).then((item) => {
                let li = document.createElement('li')
                li.innerText = `${item.attributes.name}: ${item.attributes.content}`
                this.mas.appendChild(li)
                from.querySelector('input[name=content]').value = ''
            })
        }
    }

    control.init(view)
}.call()
