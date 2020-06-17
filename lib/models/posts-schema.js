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


module.exports = mongoose.model('posts', posts);