'use strict';
/**
 * @module router 
 * @exports express.Router this module to spicfay the route and to hundel function
 */

const express = require('express');
// const params = require('../middleware/params');
require('dotenv').config();
const router = express.Router();
const bearer = require('../middleware/bearer-auth.js');
const permissions = require('../middleware/authorize');

// router.param('model',params);



const posts = require('../models/posts-model');
const users = require('../models/users-model');
const basic = require('../middleware/basic.js');
const valid = require('../middleware/valid');
const oauth = require('../middleware/oauth');
const token = require('../middleware/token');

router.post('/signup', signupHandler);
router.post('/signin',basic,token, signinHandler);
router.get('/users',valid, usersHandler);
router.get('/oauth',oauth,token, oauthHandler);



// router.get('/:model', bearer, permissions('read'), getAllHandler);
// router.get('/:model/:id', bearer, permissions('read'), getOneHandler);
// router.post('/:model', bearer, permissions('create'), postHandler);
// router.put('/:model/:id', bearer, permissions('update'),putAllHandler);
// router.patch('/:model/:id', bearer, permissions('update'),putAllHandler);
// router.delete('/:model/:id', bearer, permissions('delete'),deleteAllaunler) ;


router.get('/status', bearer, permissions('admin'), getAllHandler);
router.get('/status/:id', bearer, permissions('admin'), getOneHandler);
router.put('/status/:id', bearer, permissions('admin'),putAllHandler);


/**
 * @function putAllHandler function to hunndel the update when the requist method is put
 * @param {object} req this object have the req param and the object data to update
 * @param {object} res this will have a object after update as a json pakage  
 * @param {function} next this function to callback after the function done  
 */
function putAllHandler(req, res,next)  {
  posts 
    .update(req.params.id,req.body)
    .then(data =>res.json(data))
    .catch(err=>next(err.message));  
}
/**
 * @function deleteAllaunler function to hunndel the delete when the requist method is delete
 * @param {object} req this object have the req param 
 * @param {object} res this will have a object that has been deleted as a json pakage  
 * @param {function} next this function to callback after the function done  
 */
// function deleteAllaunler(req, res,next)  {
//   req.model
//     .delete(req.params.id)
//     .then(data =>res.json(data))
//     .catch(err=>next(err.message));
// }

/**
 * @function getAllHandler function to hunndel the get all object when the requist method is get
 * @param {object} req this object have the req param 
 * @param {object} res this will have the number of object and the the object as array inside result 
 * @param {function} next this function to callback after the function done  
 */

function getAllHandler(req, res, next) {
  posts
    .get()
    .then((data) => res.json({count:data.length ,'results': data}))
    .catch((err) => next(err.message));
}
/**
 * @function getOneHandler function to hunndel the get one opject when the route has id extention 
 * @param {object} req this object have the req param and the id for the object
 * @param {object} res this will have a object with the requisted id as a json pakage  
 * @param {function} next this function to callback after the function done  
 */
function getOneHandler(req, res, next) {
  posts
    .get()
    .then((data) => res.json(data))
    .catch((err) => next(err.message));
}
/**
 * @function postHandler function to hunndel the creat when the requist method is post
 * @param {object} req this object have the req param and the object data to creat
 * @param {object} res this will have a object after iit has been createn  as a json pakage  
 * @param {function} next this function to callback after the function done  
 */
// async function postHandler(req, res, next) {
//   try {
//     const data = await req.model.create(req.body);
//     res.json(data);
//   } catch (e) {
//     next(e.message);
//   }
// }
function signupHandler (req, res,next)  {
  console.log('signupHandler');
  users
    .createUser(req.body)
    .then((user) => {
      console.log('this is user after sign up',user);
      const token = users.generateToken(user);
      // req.user =await users.update(req.user._id,{token:req.token});
      // console.log('token',token);
      req.user=user;
      return token;

    }).then(token=>{
      console.log('token',token);
      req.token=token;
      // users.update(req.user._id,{token:req.token});
      return users.update(req.user._id,{token:req.token});
    }).then((userUpdate)=>{
      console.log('userUpdated',userUpdate);
      req.user = userUpdate;
      res.json({ token:req.token }); // => {token:aklndkalsndalksnd}
    })
    .catch((err) => next(err));
  // res.status(403).send(err.message
}

function signinHandler(req, res,next)  {
  console.log('signinHandler');
  res.json({ token: req.token });
}

async function usersHandler(req, res, next) {
  console.log('inside users');
  let allUseres = await users.get();
  // console.log('all users',allUseres);
  res.json(allUseres);
}

async function oauthHandler(req, res, next) {
  console.log('inside aouth');
  
  res.json({ token:req.token});
}
module.exports = router;