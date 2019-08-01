'use strict';

const config = require('config');

let realm = 'Basic Authentication';


function authenticationStatus(resp) {
    resp.writeHead(401, {'WWW-Authenticate': 'Basic realm="' + realm + '"'});
    resp.end('Authorization is needed');
};

const validateRequest = (req, res, next) => {
    console.log("middle");
    const input = {};
    input.token = req.body.token || req.query.token || req.headers['authorization'];
    input.current = req.body.current || req.query.current || req.headers['current'];
    input.originalUrl = req.originalUrl;
    var credentials = {
        userName: config.basicAuth.userName,
        password: config.basicAuth.password
    };


    let authentication, loginInfo;

    if (!req.headers.authorization) {
        authenticationStatus(res);
        return;
    }
    // console.log(req.headers);
    authentication = req.headers.authorization.replace(/^Basic/, '');

    authentication = (new Buffer(authentication, 'base64')).toString('utf8');

    loginInfo = authentication.split(':');

    if (loginInfo[0] === credentials.userName && loginInfo[1] === credentials.password) {
        return next();
    } else {
        return res.status(401).send({ error: "UNAUTHORISED" });
    }
};




module.exports = validateRequest;
