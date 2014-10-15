var logger = require('bragi')

// logger.options.groupsEnabled = [ 'detail' ]
logger.options = {
    groupsEnabled: true,
    showMeta: false
};

function getColor(statusCode){
    var color = null;
    switch(statusCode){
        case 200:
            color = 'green';
            break;
        case 304:
            color = 'green';
            break;
        case 404:
            color = 'red';
            break;
        case 500:
            color = 'red';
            break;
        default:
            color = 'white';
    }
    return color;
}

exports.detail = function *(next){
    // console.log(next);
    var start = Date.now();

    yield next;
    
    var end = Date.now();
    var msg = this.method+'  '+this.url+'  -  '+this.status;
    msg += '  ' + (this.response.header['content-length']/1024).toFixed(2) + 'kb';
    msg += '  '+ (end - start)+'ms';
    var color = getColor(this.status);
    logger.log( 'req-res', logger.util.print( msg, color ));
    // logger.log( 'try', this.response );
};