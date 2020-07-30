'use strict';
const moment = require('moment');
const mongoose = require('mongoose');
const messages = mongoose.Schema({
  roomId: { type: String, required: true},
  sender: { type: String, required: true },
  payload: { type: String, required: true  },
  date: { type: Date, default: Date.now },
  seen: { type: Boolean,default: false },
  dateOfSeen:{ type: String },
});
messages.pre('save',async ()=>{
  console.log('this.date1------>',this.date);
  this.date = await moment().format('MMMM Do YYYY, h:mm:ss a');
  console.log('this.date2------>',this.date);
});
messages.pre('findByIdAndUpdate',()=>{
  if(this.seen==true){
    this.dateOfSeen= moment().format('MMMM Do YYYY, h:mm:ss a');
  }
});
module.exports = mongoose.model('messages', messages);