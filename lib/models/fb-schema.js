'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema({
  name: String,
  facebookID: String,
  accessToken: String,
}, {collection: 'users'});

const model = mongoose.model('fbUser', Schema);
module.exports = model;