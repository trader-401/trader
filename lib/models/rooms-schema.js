'use strict';
const moment = require('moment');
const mongoose = require('mongoose');
const messages = require('./messages-schema');
const rooms = mongoose.Schema({
  // room: { type: String,unique: true },
  firstUser: { type: String, required: true },
  secondUser: { type: String, required: true  },
  firstSocket:{ type: String},
  secondSocket:{ type: String},
});
rooms.virtual('date').
  get(function() { return `${messages.findOne({}).sort({date: -1}).execFind(function(err,docs){

  }).date}`; }).
  set(function(v) {
    this.set({date:v});
  });

module.exports = mongoose.model('rooms', rooms);