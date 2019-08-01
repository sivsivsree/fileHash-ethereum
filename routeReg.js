'use strict';

const routes = require('./routes');


const routerRegistration = (app) => {


    app.use("/v1", routes.router);



};

module.exports = routerRegistration;
