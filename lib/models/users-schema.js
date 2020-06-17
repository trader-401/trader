'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const users = mongoose.Schema({
  username: { type: String, required: true,unique: true },
  password: { type: String, required: true },
  email: { type: String },
  fullName: { type: String },
  role: { type: String, enum: ['admin', 'editor', 'writer', 'user'] ,default:'user' },
  token: { type: String },
},{toObject:{virtual:true},toJSON:{virtual:true}});
users.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 5);
});
users.virtual('posts',{
  ref:'posts',
  localField:'username',
  foreignField:'username',
  justOne:true,

});
users.pre('find',function(){
  this.populate('posts');
});
users.post('save',async function(){
  await this.populate('posts').execPopulate();
});
module.exports = mongoose.model('users', users);