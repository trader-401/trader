'use strict';
/**
 * @module server
 * @exports expres 
 * @exports morgan
 * @exports cors
 * @exports middleware
 */
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const api = require('./routes/api');


const logRequest = require('./middleware/logger.js');
const timeRequest = require('./middleware/timestamp.js');
const notFound = require('./middleware/404.js');
const serverError = require('./middleware/500.js');
const app = express();

// global middleware
app.use(express.static('./public'));
app.use('/docs', express.static('./docs'));
app.use(express.json()); //body-parser to add body to the req
app.use(morgan('dev'));
app.use(cors());
app.use(timeRequest);
app.use(logRequest);


//global middleware                                               



// categories
app.use('/api/v1', api);





/**
 * @
 */
app.use('*', notFound);
app.use(serverError);

module.exports = {
  server: app,
  start: (port) => {
    const PORT = port|| 3000;
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  },
};


