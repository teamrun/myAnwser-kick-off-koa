var koa = require('koa')
var logger = require('./util/logger')
var binder = require('./util/binder')



var app = koa();

app.use(logger.detail);

/*
 * 通过判断path 配合中间件 + yield next机制 实现路由
 * 
 */

// 常规路由
app.use(function *(next){
    if(this.path == '/'){
        this.body = 'hello koa';
    }
    else{
        yield next;
    }
});
// error 错误处理
app.use(function *(next){
    if(this.path == '/404'){
        this.status = 404;
        this.body = 'page not found';
    }
    else if(this.path == '/500'){
        this.status = 500;
        this.body = 'internal server error';
    }
    else{
        yield next;
    }
});


binder(app);