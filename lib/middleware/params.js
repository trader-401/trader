'use strict';
/**
 * @module params this model will sspecifay the route and add id to requist params model 
 * @function params
 * @param {object} req
 * @param {object} res will not resopnse
 * @param {function} next this is next function 
 */
const categories = require('../models/categories-model');
const product = require('../models/products-model');
module.exports = (req, res, next) =>{
  const model = req.params.model; // ==>cat ||prod
  switch (model) {
  case 'categories':
    req.model = categories;
    // console.log(req) ;
    next();
    return;
  case 'products':
    req.model = product;
    // console.log(req) ;
    next();
    return;
  default:
    next('invalid model');
    return;
  }
};