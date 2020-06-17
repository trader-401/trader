'use strict';
// req.user =?
// module.exports = (req, res, next) => {};
module.exports = (capability) => {
  // capability == "create" || 'update' || 'delete
  return (req, res, next) => {
    // we are expecting the bearerAuth middleware to add the user on the req
    // we need to find the user capabilities
    // req.user.capabilities = Array
    // ['read'] || ['read', 'create', 'update'] || ['read', 'create', 'update', 'delete']
    const authorization ={'admin':['read', 'create', 'update', 'delete'], 'editor':['read', 'update'], 'writer':['read', 'create'], 'user':['read'],

    };
    try {
      console.log('authorization (capability)',authorization[req.user.role],(capability));
      if (authorization[req.user.role].includes(capability)) {
        next();
      } else {
        next('you are not authorize to Access this rote!!');
      }
    } catch (e) {
      next('Invalid Login');
    }
  };
};