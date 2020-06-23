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
router.get('/fav', bearer, showAllFav);


// show all favorite posts 
async function showAllFav(req, res, next) {
  try {
    let user = (await userModel.get(req.user.id))[0];
    console.log(' showallfav user ---------->',user.favPost);
    let favs = [];
    user.favPost.forEach(async postId => {favs.push(await postModel.get(postId[0]));
      console.log('fav post id ----------->',favs,'-----------------------------/n',postId);
    });
    console.log('favs -------------------------->',favs);
    res.json(favs);
  }
  catch (e) {
    next(e);
  }
}



// add My favorite Posts 
async function addFavPosts(req, res, next) {
  try {
    console.log('req.userrrrrr----------------->',req.user);
    let user = (await userModel.get(req.user.id))[0];
    let post =await postModel.get(req.params.id);
    console.log('fav userrrrrrrrrrrr-------------------->',user);
    console.log('fav posssssssssssst-------------------------->',post[0]);
    console.log('user.favPost.includes(post[0]._id-------->',user.favPost.includes(post[0]._id));
    if(!user.favPost.includes(post[0].id)){
      user.favPost.push(post[0].id);
      await userModel.update(user._id,user);
      user = (await userModel.get(req.user.id))[0];
      console.log('user after update inside fav-------------------->',user);
    }
    
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