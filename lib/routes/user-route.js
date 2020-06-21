'use strict';
const express = require('express');
const router = express.Router();
const userModel = require('../models/users-model.js');
const postModel=require('../models/posts-model.js');
const basicAuth = require('../middleware/basic.js');
const specifyUser = require('../middleware/specifyUsers');
const userCheck = require('../middleware/userCheck.js');


router.get('/user/:username',specifyUser, userCheck , userHandler);
router.get('/user/:username',specifyUser,userCheck,showFavPosts);

// show My favorite Posts 
async function showFavPosts(req,res,next) {
  try {
    let post = await postModel.get(req.params.id);
    console.log('post', post);
    if (post[0].username === req.user.username) {
      postModel
        .update(req.params.id, { deleted: true })
        .then(data => res.json(data))
        .catch(err => next(err.message));
    } else {
      next('Username Invalid');
    }
  }
  catch (e) {
    next(e);
  }
}


function userHandler(req,res,next){
  userModel
    .get(req.params.id)
    .then((data) =>res.json(data))
    .catch(next);
}
module.exports = router;