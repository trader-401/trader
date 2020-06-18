'use strict';
const express = require('express');
const router = express.Router();
const postModel = require('../models/posts-model.js');
const berar = require('../middleware/bearer-auth');


router.delete('/search/:id',berar,deletePost);
router.post('/user/:username', berar, postHandler);


async function postHandler(req, res, next) {
  console.log('req.user.username',req.user.username);
  console.log('req.params.username',req.params);

  if (req.params.username === req.user.username) {
    try {
      req.body.username=req.user.username;
      const data = await postModel.create(req.body);
      res.json(data);
    } catch (e) {
      next(e.message);
    }
  } else {
    next('Invalid User Post');
  }

}

async function deletePost(req,res,next) {
  try{
    let post= await postModel.get(req.params.id);
    console.log('post',post);
    if (post[0].username === req.user.username) {
      postModel
        .update(req.params.id,{ deleted: true})
        .then(data =>res.json(data))
        .catch(err=>next(err.message));
    }else{
      next('Username Invalid');
    }
  }
  catch(e){
    next(e);
  }
}
module.exports = router;