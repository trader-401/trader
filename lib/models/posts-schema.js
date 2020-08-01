'use strict';
require('dotenv').config();
const mongoose = require('mongoose');
let commentSchema = mongoose.Schema({
  username: { type: String },
  theComment: { type: String },
});
// let rateSchema=mongoose.Schema({
//   username: { type: String },
//   theRate: { type: String },
// });
const posts = mongoose.Schema({
  username: { type: String, required: true },
  title: { type: String, required: true },
  userImage: { type: String },
  description: { type: String, required: true },
  images: { type: Array },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  deleted: { type: Boolean, default: false },
  categories: { type: String, required: true },
  // userRate: [rateSchema],
  rate:{type:Number},
  positiveRateUser:{type:Array},
  negativeRateUser:{type:Array},
  comment: [commentSchema],
});


module.exports = mongoose.model('posts', posts);