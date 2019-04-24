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
