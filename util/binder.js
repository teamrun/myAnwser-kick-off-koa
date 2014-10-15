module.exports = function(app){
    var port = process.argv[2];
    app.listen(port, function(){
        console.log('app is listening at %s', port);
    });
}