var merge      = require('merge');
//var sqlpool = {};
//var redis;


module.exports.inject = function(app, router) {

    // init middleware helpers
    router.use(function(req, res, next) {

        //CORS
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');        
        if ('OPTIONS' == req.method) { // this is a pre-flight options verification we do not want to run the code behind
            res.sendStatus(200);
            return;
        }
        //CORS

        req._ = _;
        req.abcc ="heloo worlddd";
        req.all = merge.recursive(true, req.parms, req.query, req.body, req.headers);
        req.all.remoteAddress = req.connection.remoteAddress;
        req.all.ip =  (req.headers['x-forwarded-for']||',').split(',')[0] || req.connection.remoteAddress;
        req.all.ip = (req.all.ip == "::1") ? "192.168.1.1": req.all.ip;
        req.all.browser = req.headers['user-agent'];

        req.var = {};
        req.get = function(key, defval) {
        return req.params[key] || req.body[key] || req.query[key] || (defval||'');
        }
        next(); 
    });
}

