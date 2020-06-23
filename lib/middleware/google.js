'use strict';
require('dotenv').config();
const superagent = require('superagent');
const users = require('../models/users-model');
const tokenServerUrl = 'https://oauth2.googleapis.com/token';
const remoteAPI = 'https://www.googleapis.com/oauth2/v1/userinfo';
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
    console.log('GOOGLE USER', remoteUser);

    req.body={username:remoteUser.email,
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
    grant_type:'authorization_code',
  });
  console.log('tokenResponse.body------------>',tokenResponse.body);
  const access_token = tokenResponse.body.access_token;
  return access_token;
}


async function getRemoteUserInfo(token) {
  const userResponse = await superagent
    .get(remoteAPI)
    .set('Authorization', `Bearer ${token}`);
    // .set('user-agent', 'express-app');

  const user = userResponse.body;
  // const user = userResponse;
  return user;
}


async function getUser1(remoteUser) {
  try{
    return await users.oauthUser(remoteUser);   
  }catch(e){
    Promise.reject(e.message);
  }
}
