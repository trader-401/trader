'use strict';

const users = require('../models/users-model');

module.exports =(req, res, next) => {
  // check if the user has the same id of the params id
  try{
    //check req.user if it guest
    // get extention route user name 
    // req.user this is the user signed in 
    //compare between this user and page owner if yes set req.owner
    console.log('inside user check');
    const paramsUser = req.params.username;
    const userName = req.user.username;
    if (paramsUser === userName){
      console.log('valid user', paramsUser);
      req.owner = paramsUser;
      next();
    }
    else{
      next();
    }
  }
  catch (e) {
    next('Invalid Login');
  }

  
};
