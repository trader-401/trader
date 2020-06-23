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
    userModel.get(req.user.id)
      .then(user => {
        user.favPost.push(req.params.id);
        res.json('Post Add to Fav');
      }).catch(e => {
        res.json('Invalid Post');
      });
  }
  catch (e) {
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