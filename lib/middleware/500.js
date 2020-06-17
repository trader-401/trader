/**
 * @module 500 this model have the function that will hundel the 500  erorr wich is server error
 * @function 500
 * @param {string} err this is the error that has been happened
 * @param {object} req
 * @param {object} res this will response with 500 status and the error msg
 * @param {function} next this is next function 
 */
module.exports = (err,req, res, next) => {
  res.status(500);
  res.statusMessage = 'Server Error :(';
  res.json({ error: err });
};