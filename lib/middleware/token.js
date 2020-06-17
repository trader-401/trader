'use strict';
const users = require('../models/users-model');
// req.user
module.exports = async(req, res, next) => {
  console.log('user inside token',req.user);
  req.token=await users.generateToken(req.user);
  let user =await users.update(req.user._id,{token:req.token});
  console.log(user);
  next();
};