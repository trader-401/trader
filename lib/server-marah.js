'use strict';


require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const notFound = require('./middleware/404.js');
const serverError = require('./middleware/500.js');
const bodyParser = require('body-parser');
const app = express();
const api = require('./routes/api');
const userRoute = require('./routes/user-route');
const postRoute=require('./routes/post-route.js');
const logRequest = require('./middleware/logger.js');
const timeRequest = require('./middleware/timestamp.js');
// const facebookHandler = require('./oauth/facebookHandler.js');

app.use(express.static('./public'));
app.use('/', express.static('./public'));
// app.use('/docs', express.static('./docs'));
app.use(express.json()); //body-parser to add body to the req
app.use(morgan('dev'));
app.use(cors());
app.use(timeRequest);
app.use(logRequest);
app.use('', userRoute);
app.use('', api);
app.use('',postRoute);
app.use(bodyParser.json());
// app.post('/login-with-facebook', facebookHandler);

app.use('*', notFound);
app.use(serverError);

module.exports = {
  server: app,
  start: (port) => {
    const PORT = port|| 3000;
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  },
};

