'use strict';

const express = require('express');
const router = express.Router();
const postModel = require('../models/posts-model.js');
const CatModel = require('../models/categories-model.js');

const berar = require('../middleware/bearer-auth');

router.delete('/search/:id', berar, deletePost);
router.post('/user/:username', berar, postHandler);
router.put('/user/:id', berar, updatePost);
router.get('/all', showAllPosts);
router.get('/categories', getAllCategories);
router.post('/category', postCategories);
router.get('/searchBy/:categories', showPostsByCategory);
router.post('/rate/:id', berar, ratePost);
router.post('/comment/:id', berar, commentPost);
router.get('/search/:id', showOnePost);

//HANDLERS:

/////// ADD COMMENT ON POST
async function commentPost(req, res, next) {
  try {
    let post = (await postModel.get(req.params.id))[0];
    console.log('req.params.id ----------->', post);
    let commentBody = {};
    commentBody.username = req.user.username;
    commentBody.userImage=req.user.userImage;
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

/////// SHOW one POST
function showOnePost(req, res, next) {
  console.log('onepost------>',req.params.id);
  postModel.getOnePost(req.params.id).then((data) => {
    console.log(data);
    res.json(data);
  });
  // .catch(err => next(err.message));
}
/////// RATE POST
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


/////// SHOW ALL POST
function showAllPosts(req, res, next) {
  postModel.getAllPosts()
    .then(data => {
      console.log(data);
      res.json(data);
    })
    .catch(err => next(err.message));
}

/////// GET ALL CATEGORIES
function getAllCategories(req, res, next) {
  CatModel.get()
    .then(data => {
      console.log(data);
      res.json(data);
    })
    .catch(err => next(err.message));
}

/////// POST CATEGORIES
function postCategories(req, res, next) {
  CatModel.create(req.body)
    .then(data => {
      console.log(data);
      res.json(data);
    })
    .catch(err => next(err.message));
}


/////// SHOW POST BY CATEGORIES FOR USERS
function showPostsByCategory(req, res, next) {
  let query = req.params.categories;
  postModel.searchGet({ categories: query , status:'accepted'})
    .then(data => {
      console.log(data);
      res.json(data);
    })
    .catch(err => next(err.message));
}


/////// UPDATE POST
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


/////// CREATE POST
async function postHandler(req, res, next) {
  console.log('req.user.username', req.user.username);
  console.log('req.params.username', req.params);

  if (req.params.username === req.user.username) {
    try {
      req.body.username = req.user.username;
      req.body.userImage = req.user.userImage;
      const data = await postModel.create(req.body);
      res.json(data);
    } catch (e) {
      next(e.message);
    }
  } else {
    next('Invalid User Post');
  }

}


/////// DELETE POST
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


// RATING POST SOLUTION 2

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
