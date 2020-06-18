const users = require('../models/users-model.js');

module.exports = (req, res, next) => {
  console.log('inside bearer');
  if (!req.headers.authorization) {
    next('Invalid Login no auth headers');
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
      next('Invalid auth header');
    }
  }
};