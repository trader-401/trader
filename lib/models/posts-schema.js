'use strict';
require('dotenv').config();
const mongoose = require('mongoose');

const posts = mongoose.Schema({
  username: { type: String, required: true,unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: Array },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'] ,default:'pending' },
  deleted: { type: Boolean ,default:false},
});

posts.virtual('category',{
  ref:'category',
  localField:'categories',
  foreignField:'categories',
  justOne:true,
  
});
posts.pre('find',function(){
  this.populate('category');
});
module.exports = mongoose.model('posts', posts);