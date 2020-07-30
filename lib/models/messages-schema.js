'use strict';
const moment = require('moment');
const mongoose = require('mongoose');
const messages = mongoose.Schema({
  roomId: { type: String, required: true},
  sender: { type: String, required: true },
  payload: { type: String, required: true  },
  date: { type: String },
  seen: { type: Boolean,default: false },
  dateOfSeen:{ type: String },
});
messages.pre('save',async ()=>{
  this.date = await moment().format('MMMM Do YYYY, h:mm:ss a');
});
messages.pre('findByIdAndUpdate',()=>{
  if(this.seen==true){
    this.dateOfSeen= moment().format('MMMM Do YYYY, h:mm:ss a');
  }
});
module.exports = mongoose.model('messages', messages);