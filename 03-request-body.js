var koa = require('koa')
var coBody = require('co-body')

var logger = require('./util/logger')
var binder = require('./util/binder')

var app = koa();

app.use(logger.detail)

app.use(function *(next){
    if(this.path == '/'){
        if(this.method == 'POST'){
            // 使用yield able的模块来解析post的参数
            var data = yield coBody(this)
            var name = data.name;
            if(name){
                this.body = name.toUpperCase();
            }
            else{
                this.body = 'post body error: name required';
            }
        }
        else{
            this.body = 'hello koa';
        }
    }
    else{
        yield next;
    }
});


binder(app);