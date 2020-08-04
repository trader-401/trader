'use strict';
const moment = require('moment');
const mongoose = require('mongoose');
// const messages = require('./messages-schema');
const rooms = mongoose.Schema({
  // room: { type: String,unique: true },
  firstUser: { type: String, required: true },
  secondUser: { type: String, required: true  },
  firstSocket:{ type: String},
  secondSocket:{ type: String},
},{toObject:{virtuals:true},toJSON:{virtuals:true}});
rooms.virtual('messages',{
  ref:'messages',
  localField:'_id',
  foreignField:'roomId',
  justOne:false,

});
rooms.virtual('firstImage',{
  ref:'users',
  localField:'firstUser',
  foreignField:'username',
  justOne:true,

});
rooms.virtual('secondImage',{
  ref:'users',
  localField:'secondUser',
  foreignField:'username',
  justOne:true,

});

rooms.pre('find',function(next){
  try{
    this.populate('messages' );
    this.populate(  'firstImage', 'userImage');
    this.populate( 'secondImage', 'userImage');
    next();
  }catch(e){
    console.log('this error inside find ---------------->',e);
  }
});
rooms.post('find',async function(){
  try{
    await this.populate('messages').execPopulate((err)=>{
      console.log(err);
    });
    await this.populate('firstImage', 'userImage').execPopulate((err)=>{
      console.log(err);
    });
    await this.populate('secondImage', 'userImage').execPopulate((err)=>{
      console.log(err);
    });
  }catch(e){
    console.log('this error inside find ---------------->',e);
  }
});
// rooms.virtual('date').
//   get(function() { return `${messages.findOne({}).sort({date: -1}).execFind(function(err,docs){

//   }).date}`; }).
//   set(function(v) {
//     this.set({date:v});
//   });
  
module.exports = mongoose.model('rooms', rooms);