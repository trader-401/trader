'use strict';


module.exports =(req, res, next) => {
  // check if the user has the same username of the params username
  try{
    console.log('inside user check');
    const paramsUser = req.params.username;
    const userName = req.user.username;
    if (paramsUser === userName){
      console.log('valid user', paramsUser);
      req.owner = paramsUser;
      next();
    }
    else{
      next();
    }
  }
  catch (e) {
    next('Invalid Login');
  }

  
};
