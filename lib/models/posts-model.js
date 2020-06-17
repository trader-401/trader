'use strict';
const schema = require('./posts-schema');
const Model = require('./model.js');
class posts extends Model {
  constructor() {
    super(schema);
  }
  
}

module.exports = new posts();