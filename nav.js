(function(){
    let ats = document.getElementsByClassName('subtarget')
    for(let i=0; i<ats.length; i++){
        ats[i].onmouseenter = function(me){
            me.currentTarget.classList.add('active')
        }
        ats[i].onmouseleave = function(ml){
            ml.currentTarget.classList.remove('active')
        }
    }
}.call())