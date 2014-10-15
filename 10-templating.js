var app = require('koa')();
var views = require('co-views');

var render = views(__dirname+'/views', {
    ext: 'ejs'
});

var user = {
    name: {
        first: 'Tobi',
        last: 'Holowaychuk'
    },
    age: 3,
    species: 'ferret'
}

app.use(function* (){
    if(this.path === '/'){
        this.body = yield render('user', {user: user});
    }
});



require('./util/binder')(app);