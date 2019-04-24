!function(){
    /********************Load画面**************************/
    setTimeout(function(){
        wload.classList.remove('active')
    },1000)
    setTimeout(function(){aaa()},777)
    /********************Load画面**************************/
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
}.call()