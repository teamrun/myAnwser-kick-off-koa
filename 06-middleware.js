var app = require('koa')();

// middleware define
function resonseTime(){
    return function *(next){
        var start = Date.now();

        yield next;

        var end = Date.now();
        this.set('X-Response-Time', start - end);
    }
}

function upperCase(){
    return function *(next){
        yield next;

        if( typeof this.body == 'string'){
            this.body = this.body.toUpperCase()
        }
        else{
            console.log( typeof this.body );
        }
        
    }
}



app.use(resonseTime());
app.use(upperCase());

app.use(function *(){
    this.body = 'hello KOA';
    // this.body = {foo: 'bar'};
});

require('./util/binder')(app);