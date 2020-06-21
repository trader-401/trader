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
  favPost:{type:Array},
},{toObject:{virtuals:true},toJSON:{virtuals:true}});
users.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 5);
});
users.virtual('posts',{
  ref:'posts',
  localField:'username',
  foreignField:'username',
  justOne:true,

});
users.pre('find',function(next){
  try{
    this.populate('posts');
  
    next();
  }catch(e){
    console.log('this error inside find ---------------->',e);
  }
});
users.post('find',async function(){
  try{
    await this.populate('posts').execPopulate();
  }catch(e){
    console.log('this error inside find ---------------->',e);
  }
});
module.exports = mongoose.model('users', users);