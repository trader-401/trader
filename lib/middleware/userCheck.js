'use strict';

const users = require('../models/users-model');

module.exports =(req, res, next) => {
  // check if the user has the same id of the params id
  try{
    const paramsID = req.params.id;
    const userID = req.user._id;
    if (paramsID === userID){
      console.log('valid user', userID);
      next('valid user');
    }
    else{
      next('Invalid user');
    }
  }
  catch (e) {
    next('Invalid Login');
  }

  
};
