'use strict';

require('dotenv').config();
const express = require('express');
const router = express.Router();
const bearer = require('../middleware/bearer-auth.js');
const permissions = require('../middleware/authorize');
const posts = require('../models/posts-model');
const users = require('../models/users-model');
const basic = require('../middleware/basic.js');
const valid = require('../middleware/valid');
const google = require('../middleware/google');
const token = require('../middleware/token');
const fetch = require('node-fetch');
const user = require('../models/fb-schema.js');


router.post('/signup', signupHandler);
router.post('/signin',basic,token, signinHandler);
router.get('/users',valid, usersHandler);
router.get('/oauth',google,token, oauthHandler);
router.post('/login-with-facebook', facebookHandler);
router.get('/status', bearer, permissions('admin'), getAllHandler);
router.get('/status/:id', bearer, permissions('admin'), getOneHandler);
router.get('/statusBy/:categories', bearer, permissions('admin'), showPostsByCategory);
router.put('/status/:id', bearer, permissions('admin'),putAllHandler);


//HANDLERS:

/////// UPDATE POST BY ADMIN
function putAllHandler(req, res,next)  {
  posts 
    .update(req.params.id,req.body)
    .then(data =>res.json(data))
    .catch(err=>next(err.message));  
}

/////// GET ALL POST BY ADMIN
function getAllHandler(req, res, next) {
  posts
    .get()
    .then((data) => res.json({count:data.length ,'results': data}))
    .catch((err) => next(err.message));
}

/////// GET ONE POST BY ADMIN
function getOneHandler(req, res, next) {
  posts
    .get(req.params.id)
    .then((data) =>res.json(data))
    .catch((err) => next(err.message));
}

/////// SIGN UP HANDLER
function signupHandler (req, res,next)  {
  console.log('signupHandler');
  users
    .createUser(req.body)
    .then((user) => {
      console.log('this is user after sign up',user);
      const token = users.generateToken(user);
      req.user=user;
      return token;
    }).then(token=>{
      console.log('token',token);
      req.token=token;
      return users.update(req.user._id,{token:req.token});
    }).then((userUpdate)=>{
      console.log('userUpdated',userUpdate);
      req.user = userUpdate;
      res.json({ token:req.token }); 
    })
    .catch((err) => next(err));
}

/////// SIGN IN HANDLER
function signinHandler(req, res,next)  {
  console.log('signinHandler');
  res.json({ token: req.token });
}

/////// GET ALL USERS 
async function usersHandler(req, res, next) {
  console.log('inside users');
  let allUseres = await users.get();
  res.json(allUseres);
}

/////// SIGN IN USING GOOGLE 
async function oauthHandler(req, res, next) {
  console.log('inside aouth');
  res.json({ token:req.token});
}

/////// SIGN IN USING FACEBOOK 
async function facebookHandler(req, res ){
  const {accessToken, userID} = req.body;    
  const response = await fetch(`https://graph.facebook.com/v7.0/me?access_token=${accessToken}&method=get&pretty=0&sdk=joey&suppress_http_code=1`);
  const json = await response.json();
  if(json.id === userID){
    // check if the user exists in db else register and then login
    const resp = await user.findOne({facebookID:userID});
    if(resp){
      //user is registered then create a session
      res.json({status: 'ok', data: 'you are logged in'});
    } else {
      const person = new user({
        name: 'something',
        facebookID: userID,
        accessToken,
      });
      await person.save();
      res.json({status: 'ok', data: 'you are registered and logged in'});
    }
  }else {
    res.json({status: 'error', data: 'stop'});
  }
}

/////// SHOW POST BY CATEGORIES FOR ADMIN
function showPostsByCategory(req, res, next) {
  let query = req.params.categories;
  posts.searchGet({categories: query})
    .then(data => {
      console.log(data);
      res.json(data);
    })
    .catch(err => next(err.message));
}

module.exports = router;