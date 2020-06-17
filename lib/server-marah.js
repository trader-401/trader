'use strict';

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const notFound = require('./middleware/404.js');
const serverError = require('./middleware/500.js');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const app = express();
const user = require('./models/fb-schema.js');


// const userRouter = require('./routes/user-route.js');

// global middleware
// app.use(express.static('./public'));
app.use('/', express.static('./public'));

// app.use('/docs', express.static('./docs'));
app.use(express.json()); //body-parser to add body to the req
app.use(morgan('dev'));
app.use(cors());

// app.use(userRouter);
app.use(bodyParser.json());

app.post('/login-with-facebook', async (req, res)=> {
  console.log('hello');
  const {accessToken, userID} = req.body;    
  const response = await fetch(`https://graph.facebook.com/v7.0/me?access_token=${accessToken}&method=get&pretty=0&sdk=joey&suppress_http_code=1`);
  const json = await response.json();
  if(json.id === userID){
    //valid user
    // check if the user exists in db else register and then login
    const resp = await user.findOne({facebookID:userID});
    if(resp){
      //user is registered then create a session
      res.json({status: 'ok', data: 'you are logged in'});
    } else {
      const person = new user({
        name: 'something',
        facebookID: userID,
        accessToken,
      });

      await person.save();

      res.json({status: 'ok', data: 'you are registered and logged in'});
    }
  }else {
    // invalid user warning
    res.json({status: 'error', data: 'stop'});
  }
});


app.use('*', notFound);
app.use(serverError);

module.exports = {
  server: app,
  start: (port) => {
    const PORT = port|| 3000;
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  },
};

