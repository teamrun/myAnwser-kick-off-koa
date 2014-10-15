var app = require('koa')();
var session = require('koa-session');

app.keys = ['secret', 'keys'];

app.use(session());

app.use(function* (){
    if(this.path = '/'){
        // 直接用键名访问...
        // 不用get set
        var viewCount = ~~this.session.view + 1;
        this.session.view = viewCount;
        this.body = viewCount + ' views';
    }
});

require('./util/binder')(app);