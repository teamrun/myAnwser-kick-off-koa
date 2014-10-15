var app = require('koa')();
var session = require('koa-session');
var parse = require('koa-bodyparser');

app.keys = ['so many', 'auth', 'keys'];

var form = '<form action="/login" method="POST">\
      <input name="username" type="text" value="username">\
      <input name="password" type="password" placeholder="The password is \'password\'">\
      <button type="submit">Submit</button>\
    </form>';

app.use(session());

app.use(function* (next){
    if(this.path === '/'){
        if(this.session.authed === 'true'){
            this.body = 'hello world';
        }
        else{
            this.status = 401;
            this.body = 'forbidden by hand';
        }
    }
    else{
        yield next;
    }

    
});

var coBody = require('co-body');
app.use(function* (next){
    if( this.path === '/login' ){
        if(this.method === 'GET'){
            this.body = form;
        }
        else if(this.method === 'POST'){
            var data = yield coBody(this);
            // console.log(this.request);
            if( login(data.username, data.password) ){
                this.session.authed = 'true';
                // this.body = 'login success';
                this.redirect('/');
            }
            else{
                this.status = 400;
                this.body = 'wrong username and pwd combo';
            }
        }
    }
    else{
        yield next;
    }
});


app.use(function* (next){
    if(this.path === '/logout'){
        this.session.authed = 'expired';
        // this.body = 'logout success~';
        this.redirect('/login');
    }
    else{
        yield next;
    }
});


function login(username, pass){
    if( username == 'username' && pass === 'password' ){
        return true;
    }
    return false;
}



require('./util/binder')(app);