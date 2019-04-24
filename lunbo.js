!function(){
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
}.call()