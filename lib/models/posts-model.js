'use strict';
const schema = require('./posts-schema');
const Model = require('./model.js');
class posts extends Model {
  constructor() {
    super(schema);
  }
  // get(_id) {
  //   const queryObject = _id ? { _id } : {};
  //   return this.schema.find(queryObject);
  // }
  getOnly() {
    const queryObject = { deleted : false,
      status :  'accepted' };
    return this.schema.find(queryObject);
  }
  
}

module.exports = new posts();