var app = require('koa')();

// middleware define
function errHandler(){
    return function* (next){
        try{
            yield next;
        }
        catch(err){
            this.status = 500;
            this.body = 'internal server error';
        }
    }
}


// use middleware and try-catch to handle error
// app.use(errHandler());

// use .on('error')
app.on('error', function(err, ctx){
    console.log('caught by .on("error", handler)...')
    console.log(err);
    // set body won't work, it is seted by ... who knows
    // this.body = 'internal server error by hand';
    // ctx.body = 'internal server error by hand';
});

app.use(function* (){
    if(this.path == '/error'){
        throw new Error('ooops');
    }
    this.body = 'OK';
});

require('./util/binder')(app);