(function(){
    let view = document.querySelector('section.massage')

    let modle = {
        find : function(){
            let Massage = new AV.Query('Massage');
            return Massage.find()
        },
        save : function(name,content){
            let Massage = AV.Object.extend('Massage');
            let massage = new Massage();
            return massage.save({
                'name': name,
                'content': content
            })
        }
    }

    let control = {
        view : null,
        mas : null,
        from : null,
        init : function(view){
            this.view = view
            this.initAV()
            this.loadmassages()
            this.bindEvents()
        },
        initAV : function(){
            let APP_ID = '1YOGzkMHmL8wI05XyeRfbxga-MdYXbMMI'
            let APP_KEY = 'iLmfTXArKmB3P4RQ7Q9RPubt'
            AV.init({ appId: APP_ID , appKey: APP_KEY });
        },
        loadmassages : function(){
            modle.find().then( (massages) => {
                let array = massages.map((massages) => massages.attributes)
                array.forEach((item) => {
                    let li = document.createElement('li')
                    li.innerText = `${item.name}: ${item.content}`
                    let mas = view.querySelector('#massageList')
                    mas.appendChild(li)
                    
                });
            }).then(function(todos) {
                // 更新成功
            }, function (error) {
                // 异常处理
            });
        },
        bindEvents : function(){
            let from = view.querySelector('#postmas')
            from.addEventListener('submit', (s) => {
                s.preventDefault()
                if(view.querySelector('input[name=content]').value !== ''){
                    this.save.call()
                }
            })
        },
        save : function(){
            let content = view.querySelector("input[name='content']").value
            let name = view.querySelector("input[name='name']").value
            modle.save(name,content).then((item) => {
                let li = document.createElement('li')
                li.innerText = `${item.attributes.name}: ${item.attributes.content}`
                let mas = view.querySelector('#massageList')
                mas.appendChild(li)
                view.querySelector('input[name=content]').value = ''
                
            })
        }
    }

    control.init(view)
}.call())
