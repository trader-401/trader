'use strict';
/**
 * @module timestamp this model will add the time of requist to req parameter 
 * @function timestamp
 * @param {object} req
 * @param {object} res not used
 * @param {function} next this is next function 
 */
module.exports = (req, res, next) => {
  req.requestTime = new Date();
  next();
};