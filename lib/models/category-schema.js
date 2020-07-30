'use strict';

const mongoose = require('mongoose');

const category = mongoose.Schema({
  categories: {
    type: String,
    require : true,
    unique: true,
  },
  images: {
    type: String,
    require : true,
    unique: true,
  },
},{toObject:{virtual:true},toJSON:{virtual:true}});


category.virtual('posts',{
  ref:'posts',
  localField:'categories',
  foreignField:'categories',
  justOne:true,
  
});

category.pre('find',function(){
  this.populate('posts');
});

category.post('save',async function(){
  await this.populate('posts').execPopulate();
});
const model = mongoose.model('category', category);
module.exports = model;