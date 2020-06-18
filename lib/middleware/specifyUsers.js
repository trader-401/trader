const users = require('../models/users-model.js');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    req.user='guest';
    next();
  } else {
    const [auth, token] = req.headers.authorization.split(' ');
    if (auth === 'Bearer') {
      console.log('case bearer');
      users
        .authenticateToken(token)
        .then((validUser) => {
          console.log(validUser);
          
          req.user = {
            id: validUser._id,
            username : validUser.username,
            capabilities : validUser.capabilities,
            role:validUser.role,
          };
          next();
        });
      // .catch((e) => next('Invalid login', e.message));
    } else {
      req.user='guest';
      next();
    }
  }
};