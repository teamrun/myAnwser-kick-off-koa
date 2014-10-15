var app = require('koa')();

app.keys = ['my name is teamrun', 'i like turtles'];


app.use(function* (){
    
    // 需要判断路径
    // 否则会吧favIcon的请求也计算在view页面里
    if(this.path === '/'){
        // get 和 set 都要指明option, signed: true
        // this.cookies.get/set
        // get到的是string类型的
        var alreadyViewed = Number(this.cookies.get('view', {signed: true}));
        if( isNaN(alreadyViewed) ){
            alreadyViewed = 0;
        }
        var viewCountThisTiime = alreadyViewed + 1;
        this.cookies.set('view', viewCountThisTiime, { signed: true });
        this.body = viewCountThisTiime + ' views';
    }
    
});

require('./util/binder')(app);