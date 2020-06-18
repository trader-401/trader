'use strict';
const express = require('express');
const router = express.Router();
const userModel = require('../models/users-model.js');
const basicAuth = require('../middleware/basic.js');
const userCheck = require('../middleware/userCheck.js');


router.get('/user/:id' ,userCheck , userHandler);


function userHandler(req,res,next){
  userModel
    .get(req.params.id)
    .then((data) =>res.json(data))
    .catch(next);
}
module.exports = router;