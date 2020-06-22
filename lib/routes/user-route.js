'use strict';
const express = require('express');
const router = express.Router();
const userModel = require('../models/users-model.js');
const postModel = require('../models/posts-model.js');
const basicAuth = require('../middleware/basic.js');
const specifyUser = require('../middleware/specifyUsers');
const userCheck = require('../middleware/userCheck.js');
const bearer = require('../middleware/bearer-auth.js');

router.get('/user/:username', specifyUser, userCheck, userHandler);
router.get('/addfav/:id', bearer, addFavPosts);
router.get('/fav/:username', bearer, showAllFav);


// show all favorite posts 
function showAllFav(req, res, next) {
  try {
    let user = userModel.get(req.user.id).favPost;
    user.forEach(post => res.json(post));
  }
  catch (e) {
    next(e.message);
  }
}



// add My favorite Posts 
async function addFavPosts(req, res, next) {
  try {
    console.log('req.userrrrrr',req.user);
    let user = await userModel.get(req.user._id);
    let post =await postModel.get(req.params._id);
    console.log('fav userrrrrrrrrrrr',user);
    console.log('fav posssssssssssst',post);
    console.log(post);
    user.favPost.push(post[0]);
    res.json('Post Add to Fav');


  }
  catch (e) {
    console.log(e);
    next(e);
  }
}




function userHandler(req, res, next) {
  userModel
    .get(req.params.id)
    .then((data) => res.json(data))
    .catch(next);
}
module.exports = router;