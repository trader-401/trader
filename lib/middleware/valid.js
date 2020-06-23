'use strict';

const base64 = require('base-64');
const users = require('../models/users-model');

// this is used for signin
module.exports =(req, res, next) => {
 
  if (!req.headers.authorization) {
    next('Invalid Login');
  } else {
    const basic = req.headers.authorization.split(' ').pop(); // ["Basic","m4e321$342"]
    console.log('basic', basic);
    const [user, pass] = base64.decode(basic).split(':'); 
    console.log('__BasicAuth__', user, pass);
    users
      .authenticate(user, pass)
      .then((validUser) => {
        console.log(validUser);
        if(validUser){
          console.log('valid');
          next();
        }else{
          console.log('unvalid');
          next('invalid authentication');
        }
      })
      .catch((err) => next(err));
  }
};