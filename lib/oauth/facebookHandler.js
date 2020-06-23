'use strict';

const fetch = require('node-fetch');
const user = require('../models/fb-schema.js');


async function facebookHandler(req, res ){
  const {accessToken, userID} = req.body;    
  const response = await fetch(`https://graph.facebook.com/v7.0/me?access_token=${accessToken}&method=get&pretty=0&sdk=joey&suppress_http_code=1`);
  const json = await response.json();
  if(json.id === userID){
    //valid user
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
    // invalid user warning
    res.json({status: 'error', data: 'stop'});
  }
}

module.exports = facebookHandler;