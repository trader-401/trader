'use strict';
/**
 * @module 404 this model have the function that will hundel the 404  erorr wich is the route is not found
 * @function 404
 * @param {object} req
 * @param {object} res this will response with 404 status
 * @param {function} next this is next function 
 */
module.exports = (req, res, next) => {
  res.status(404);
  res.statusMessage = 'Resource Not Found';
  res.json({ error: 'not Found' });
};