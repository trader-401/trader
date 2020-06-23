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

router.post('/rate/:id', berar, ratePost);
router.post('/comment/:id', berar, commentPost);

// add comment to the Post 
async function commentPost(req, res, next) {
  try {
    let post = (await postModel.get(req.params.id))[0];
    console.log('req.params.id ----------->', post);
    let commentBody = {};
    commentBody.username = req.user.username;
    commentBody.theComment = req.body.theComment;
    console.log('post after push ----------->', post);
    console.log('comment -> req.body------------>', commentBody);
    post.comment.push(commentBody);
    // post.comment=commentBody;
    let update = await postModel.update(req.params.id, post);
    console.log('update post -------->', update);
    res.json(post);
  }
  catch (e) {
    next(e.message);
  }
}

// to rate our Post 
// async function ratePost(req, res, next) {

//   try {
//     let post = (await postModel.get(req.params.id))[0];
//     console.log('req.params.id ----------->', post);
//     let userRateBody = {};
//     userRateBody.username = req.user.username;
//     userRateBody.theRate = req.body.theRate;

//     console.log('post after push ----------->', post);
//     /**
//      * {
//      * username:yazan,
//      * theRate:0....9,
//      * }
//      */
//     console.log('rate -> req.body------------>', userRateBody);
//     if (userRateBody.theRate === '+') {
//       // if (post.userRate.include())
//       post.rate++;
//     } else if (userRateBody.theRate === '-') {
//       post.rate--;
//     } else {
//       next('Dont play with my website');
//     }
//     // post.comment=commentBody;
//     post.userRate.push(userRateBody);
//     // post.rate = post.userRate.length;
//     let update = await postModel.update(req.params.id, post);
//     console.log('update post -------->', update);
//     res.json(post);
//   }
//   catch (e) {
//     next(e.message);
//   }
// }

// to rate our Post another Solution
async function ratePost(req, res, next) {
  try {
    let post = (await postModel.get(req.params.id))[0];
    console.log('req.params.id ----------->', post);
    let userRateBody = {};
    userRateBody.username = req.user.username;
    userRateBody.theRate = req.body.theRate;
    console.log('post after push ----------->', post);
    console.log('rate -> req.body------------>', userRateBody);
    if (userRateBody.theRate === '+') {
      if (post.negativeRateUser.includes(req.user.username)) {
        let index = post.negativeRateUser.indexOf(req.user.username);
        post.negativeRateUser.splice(index, 1);
      } else if (!post.positiveRateUser.includes(req.user.username)) {
        post.positiveRateUser.push(req.user.username);
      }
    } else if (userRateBody.theRate === '-') {
      if (post.positiveRateUser.includes(req.user.username)) {
        let index = post.positiveRateUser.indexOf(req.user.username);
        console.log(index);
        post.positiveRateUser.splice(index, 1);
      } else if (!post.negativeRateUser.includes(req.user.username)) {
        post.negativeRateUser.push(req.user.username);
      }
    } else {
      next('Dont play with my website "_" ');
    }
    // post.comment=commentBody;
    // post.userRate.push(userRateBody);
    post.rate = (post.positiveRateUser.length) - (post.negativeRateUser.length);
    let update = await postModel.update(req.params.id, post);
    console.log('update post -------->', update);
    res.json(post);
  }
  catch (e) {
    next(e.message);
  }
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