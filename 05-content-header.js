var koa = require('koa');
var parse = require('co-body');
var bodyParser = require('koa-bodyparser');

var logger = require('./util/logger');
var binder = require('./util/binder');

var app = koa();

app.use(logger.detail);

// 有待详细查看``` body parser
app.use( bodyParser() );

app.use(function *(){
    console.log(this.request.type);
    console.log(this.request.length);

    // var data = yield parse(this);
    console.log(this.request.body);

    if(this.request.is('application/json')){
        this.body = {message: 'hi!'};
    }
    else{
        this.body = 'ok';
    }
});

binder(app);
