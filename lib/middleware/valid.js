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
        console.log(validUser);
        // req.user=validUser;
        if(validUser){
          console.log('valid');
          next();
        }else{
          console.log('unvalid');
          next('invalid authentication');
        }
        
      })
      .catch((err) => next(err));
  }
};