'use strict';
require('dotenv').config();
const mongoose = require('mongoose');
const server = require('./lib/server.js');
/**
 * Simple configration 
 * connect to mongodb
 * @module index
 */
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


server.start(process.env.PORT);
