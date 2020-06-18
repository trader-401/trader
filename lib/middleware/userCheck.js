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
    const paramsID = req.params.id;
    const userID = req.user._id;
    if (paramsID === userID){
      console.log('valid user', userID);
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
