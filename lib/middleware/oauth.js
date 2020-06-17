'use strict';
require('dotenv').config();
const superagent = require('superagent');
const users = require('../models/users-model');
const tokenServerUrl = 'https://github.com/login/oauth/access_token';
const remoteAPI = 'https://api.github.com/user';

const CLIENT_ID = process.env.CLIENT_ID;

const CLIENT_SECRET = process.env.CLIENT_SECRET;

const API_SERVER = process.env.API_SERVER;

module.exports = async (req, res, next) => {
  //2 & 3
  try {
    const code = req.query.code;
    console.log('__THE res__',req.query);
    const remoteToken = await exchangeCodeForToken(code);
    console.log('The TOKEN', remoteToken);
    const remoteUser = await getRemoteUserInfo(remoteToken);
    console.log('GITHUB USER', remoteUser);

    req.body={username:remoteUser.login,
      password: 'aouthPasswOrd'};
    
    const user1 = await getUser1(req.body);
    console.log('after getuser',user1);
    req.user = user1;
    // req.token = await users.generateToken(user1);
    // console.log('[user, token]',req.token);
    next();
  } catch (err) {
    next(err.message);
  }
};
async function exchangeCodeForToken(code) {
  const tokenResponse = await superagent.post(tokenServerUrl).send({
    code: code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: API_SERVER,
  });
  console.log('tokenResponse.body',tokenResponse.body);
  const access_token = tokenResponse.body.access_token;
  return access_token;
}
async function getRemoteUserInfo(token) {
  const userResponse = await superagent
    .get(remoteAPI)
    .set('Authorization', `token ${token}`)
    .set('user-agent', 'express-app');

  const user = userResponse.body;
  return user;
}
async function getUser1(remoteUser) {
  try{
    let userRec =await users.create(remoteUser);
    
    return userRec;
  }catch(e){
    Promise.reject(e.message);
  }
  // const token = await users.generateToken(userRec);
  

  // let tok;
  // let getBack;
  
  // users
  //   .create(remoteUser)
  //   .then((user) => {
  //     userRec = user;
  //     console.log('this is user afer sign up',user);
  //     const token = users.generateToken(user);
  //     return token;
  //   }).then(token=>{
  //     tok=token;
  //     // console.log('[userRec,tok]',tok);
  //     return [userRec,token];
  //   })
  //   .catch((err) => console.log('already exist',err.message));
  // console.log('[userRec,tok]');
  // console.log('[userRec,tok]',[userRec,token]);
  
}