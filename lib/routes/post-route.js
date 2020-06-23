'use strict';
const express = require('express');
const router = express.Router();
const userModel = require('../models/users-model.js');
const postModel = require('../models/posts-model.js');
const berar = require('../middleware/bearer-auth');
const specifyUser = require('../middleware/specifyUsers');
const userCheck = require('../middleware/userCheck.js');
const { json } = require('body-parser');

router.delete('/search/:id', berar, deletePost);
router.post('/user/:username', berar, postHandler);
router.put('/user/:id', berar, updatePost);
router.get('/all', showAllPosts);
router.get('/searchBy/:categories', showPostsByCategory);

router.get('/search/:id',berar ,ratePost);
router.get('/search/:id',berar,commentPost);


function commentPost(req,res,next) {
  try {
    let post = userModel.get(req.params.id).comment;
    let comment=req.body.comment;
    post.push(comment);
    res.json(post);
  }
  catch (e) {
    next(e.message);
  }  
}

function ratePost(req, res, next) {
  let rate = postModel.get(req.params.id).rate;
  postModel.update({rate:rate++});
  res,json(rate);
}


// show all posts 
function showAllPosts(req, res, next) {
  postModel.getOnly()
    .then(data => {
      console.log(data);
      res.json(data);
    })
    .catch(err => next(err.message));
}

function showPostsByCategory(req, res, next) {
  let query = req.params.categories;
  // console.log('quey',query);
  postModel.searchGet({ categories: query , status:'accepted'})
    .then(data => {
      console.log(data);
      res.json(data);
    })

    .catch(err => next(err.message));
}
// update user post
async function updatePost(req, res, next) {
  try {
    let post = await postModel.get(req.params.id);
    console.log('update', post);
    let newPost = {
      title: req.body.title,
      description: req.body.description,
      categories: req.body.categories,
      images: [],

    };
    if (post[0].username === req.user.username) {
      postModel
        .update(req.params.id, newPost)
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


// create post 
async function postHandler(req, res, next) {
  console.log('req.user.username', req.user.username);
  console.log('req.params.username', req.params);

  if (req.params.username === req.user.username) {
    try {
      req.body.username = req.user.username;
      const data = await postModel.create(req.body);
      res.json(data);
    } catch (e) {
      next(e.message);
    }
  } else {
    next('Invalid User Post');
  }

}
// delete post 
async function deletePost(req, res, next) {
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
module.exports = router;