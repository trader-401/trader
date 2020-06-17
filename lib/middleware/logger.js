'use strict';
/**
 * @module logger this model have the function that will hundel the logging  every time this function called it will console log the time ,the path and the method of requist  
 * @function logger
 * @param {object} req this wil have method and the path
 * @param {object} res not used 
 * @param {function} next this is next function 
 */
module.exports = (req, res, next) => {
  console.log('Request :', req.path, req.method,req.requestTime);
  next();
};