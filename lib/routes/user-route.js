'use strict';
const express = require('express');
const router = express.Router();
const userModel = require('../models/users-model.js');
const postsModel = require('../models/posts-model.js');
const basicAuth = require('../middleware/basic.js');
const specifyUser = require('../middleware/specifyUsers');
const userCheck = require('../middleware/userCheck.js');


router.get('/user/:username',specifyUser, userCheck , userHandler);


function userHandler(req,res,next){
  if( req.owner){
    //get all user's posts from posts schema wether they are pending, published or rejected
    postsModel
      .get(req.params.id)
      .then((data) =>{
        res.json(data);
      })
      .catch(next);
  }else{
    //get all user's published posts only from posts schema
    postsModel
      .getOnly()
      .then((data) =>{
        res.json(data);
      })
      .catch(next);
  }
 
}
module.exports = router;