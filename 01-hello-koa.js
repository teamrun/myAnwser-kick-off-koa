var koa = require('koa');
var logger = require('./util/logger')
var binder = require('./util/binder')

var app = koa();

// logger
app.use(logger.detail);

app.use(function *(){
    this.body = 'hello koa';
    this.body += '\n你好, koa';
});


binder(app);