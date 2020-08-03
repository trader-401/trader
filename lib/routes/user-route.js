'use strict';

const express = require('express');
const router = express.Router();
const userModel = require('../models/users-model.js');
const postModel = require('../models/posts-model.js');
const roomsModel = require('../models/rooms-model');
const messagesModel = require('../models/messages-model');
const specifyUser = require('../middleware/specifyUsers');
const userCheck = require('../middleware/userCheck.js');
const bearer = require('../middleware/bearer-auth.js');

router.get('/user/:username', specifyUser, userCheck, userHandler);
router.get('/addfav/:id', bearer, addFavPosts);
router.get('/fav', bearer, showAllFav);
router.get('/chat', bearer, getRoomChat);
router.get('/token', tokenCheck);

//HANDLERS:
function tokenCheck(req, res, next){
  try{
    const [auth, token] = req.headers.authorization.split(' ');
    userModel
      .authenticateToken(token)
      .then((validUser) => {
        console.log('valid userrrrrrrrr',validUser);
    
        req.user = {
          id: validUser._id,
          username : validUser.username,
          userImage : validUser.userImage||'',
          capabilities : validUser.capabilities,
          role:validUser.role,
        };
        res.json(token);
      }).catch(()=>{
        res.json("token");
      });
  }catch(e){console.log(e);}
}
// get the room chat for user 
async function getRoomChat(req, res, next) {
  try {
    let rooms = (await roomsModel.getRooms(req.user.username));
    console.log(' rooms---------->', rooms);
    // async ()=>{ rooms = await rooms.map(async room=>{
    //   room['messages'] = await messagesModel.msgGet(room._id);
    //   return room;
    // });};
    // rooms.forEach(async (room,i) => {
    //   rooms[i]['messages'] = await messagesModel.msgGet(room._id);
    // console.log(' msgs---------->', msgs);
    //   // await (() => {rooms[i].messages=msgs;});
    console.log('rooms---------->',rooms);
    // });
   
    res.json(rooms);
  }
  catch (e) {
    next(e);
  }
}
/////// GET ALL FAV LIST
async function showAllFav(req, res, next) {
  try {
    let user = (await userModel.get(req.user.id))[0];
    console.log(' showallfav user ---------->', user.favPost);
    let favs = [];
    for (let i = 0; i < user.favPost.length; i++) {
      let post = await postModel.get(user.favPost[i]);
      favs.push(post[0]);
      console.log('fav post id ----------->', post[0], '-----------------------------/n', user.favPost[i]);
    }
    console.log('favs -------------------------->', favs);
    res.json(favs);
  }
  catch (e) {
    next(e);
  }
}


/////// ADD POST TO FAV
async function addFavPosts(req, res, next) {
  try {
    console.log('req.userrrrrr----------------->', req.user);
    let user = (await userModel.get(req.user.id))[0];
    let post = await postModel.get(req.params.id);
    console.log('fav userrrrrrrrrrrr-------------------->', user);
    console.log('fav posssssssssssst-------------------------->', post[0]);
    console.log('user.favPost.includes(post[0]._id-------->', user.favPost.includes(post[0]._id));
    if (!user.favPost.includes(post[0].id)) {
      user.favPost.push(post[0].id);
      await userModel.update(user._id, user);
      user = (await userModel.get(req.user.id))[0];
      console.log('user after update inside fav-------------------->', user);
    }
    res.json('Post Added to your Fav');
  }
  catch (e) {
    console.log(e);
    next(e);
  }
}


/////// GET USERS POSTs
async function userHandler(req, res, next) {
  if( req.owner){
    //get all user's posts from posts schema wether they are pending, published or rejected
    console.log('owner',(await userModel.getUserByUsername(req.params.username))[0]);
    postModel
      .getAll(req.params.username)
      .then(async (data) =>{
        let user = (await userModel.getUserByUsername(req.params.username));
        res.json({data,user});
      })
      .catch(next);
  }else{
    //get all user's published posts only from posts schema
    let test = await userModel.getUserByUsername(req.params.username);
    console.log('not owner',test);

    postModel
      .getOnly(req.params.username)
      .then(async (data) =>{
        let user = (await userModel.getUserByUsername(req.params.username));
        console.log('data,user------>',data,user);
        res.json({data,user});
      })
      .catch(next);
  }
}

module.exports = router;