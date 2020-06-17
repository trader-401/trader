const base64 = require('base-64');
const users = require('../models/users-model');

/*
headers:{
  "authorization":"Basic m4e321$342"
}
*/
// this is used for signin
module.exports =(req, res, next) => {
  // check if the client sent authorization headers
  // headers = {}
  console.log('req.headers.authorization',req.headers.authorization);
  if (!req.headers.authorization) {
    next('Invalid Login');
  } else {
    // user:pass
    const basic = req.headers.authorization.split(' ').pop(); // ["Basic","m4e321$342"]
    console.log('basic', basic);
    const [user, pass] = base64.decode(basic).split(':'); // "mahmoud:1234"
    console.log('__BasicAuth__', user, pass);
    users
      .authenticate(user, pass)
      .then((validUser) => {
        console.log('validUser',validUser[0]);
        // return users.generateToken(validUser);
        req.user=validUser[0];
        next();
      })
      // .then(data=>{
      //   req.token = data;
      //   console.log('req.token',req.token);
      //   next();
      // })
      .catch((err) => next(err));
  }
};