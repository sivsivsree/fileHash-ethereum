'use strict';

const express = require('express');
const router = express.Router();
const accessController = require('./controller/access-controller');


router.route('/access').post(accessController.access);
router.route('/getAccess').post(accessController.getAccess);
router.route('/createFile').post(accessController.createFile1);
router.route('/updateFile').post(accessController.updateFile);

module.exports = {
    router: router
};
