'use strict';


const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express');
const config = require('config');

const http = require('http');

const app = express();

let server;


console.log("Running in ......: " + process.env.NODE_ENV);
// PORT definition
const PORT = config.server.PORT;


app.use((req, res, next) => {
    // console.log(res);
    //doesn't send response just adjusts it
    res.header("Access-Control-Allow-Origin", "*"); //* to give access to any origin
    res.header(
        "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization ,current");
    res.header("Access-Control-Expose-Headers", "authorization, current");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET'); //to give access to all the methods provided
        return res.status(200).json({});
    }

    next(); //so that other routes can take over
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Logging for development
// app.use(morgan('dev',));
app.use(morgan(':method :url :response-time',));


// KEY validations and escapes
app.all('/*', [require('./controller/validate-api-key')]);


// route definitions
const routerReg = require('./routeReg');
routerReg(app);


// Error Handling
app.use((err, req, res, next) => {
    res.send({success: false, error: err})

});


// 404 custom errors
app.use((req, res) => {
    res.send({success: false})
});


server = http.createServer(app);

console.log(`[Start Server]: Started on port ${PORT}`);

server.listen(PORT).on('error', (error) => {
    console.log(`[Start Server]:  ${error}`);
});


