const users = require('../models/users-model.js');

module.exports = (req, res, next) => {
  console.log('inside bearer');
  if (!req.headers.authorization) {
    next('Invalid Login no auth headers');
  } else {
  
    const [auth, token] = req.headers.authorization.split(' ');
    if (auth === 'Bearer') {
      try{
        console.log('case bearer',token);
        users
          .authenticateToken(token)
          .then((validUser) => {
            console.log('valid userrrrrrrrr',validUser);
          
            req.user = {
              id: validUser._id,
              username : validUser.username,
              capabilities : validUser.capabilities,
              role:validUser.role,
            };
            next();
          });
      }catch(e){console.log(e);}
      // .catch((e) => next('Invalid login', e.message));
    } else {
      next('Invalid auth header');
    }
  }
};