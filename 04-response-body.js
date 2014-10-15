var fs = require('fs')

var koa = require('koa')

var logger = require('./util/logger')
var binder = require('./util/binder')

var app = koa()
app.jsonSpaces = 0


// var jsonData = fs.readFileSync('./util/json.json', 'utf-8');
var jsonData = {"foo":"bar"}
var filePath = process.argv[3]

app.use(logger.detail)
app.use(function *(next){
    if(this.path === '/stream'){
        this.body = fs.createReadStream(filePath)
    }
    else if(this.path === '/json'){
        this.type = 'application/json; charset=utf-8'
        this.body = jsonData
    }
    else{
        yield next;
    }
})

binder(app)