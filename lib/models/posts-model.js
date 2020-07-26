'use strict';
const schema = require('./posts-schema');
const Model = require('./model.js');
class posts extends Model {
  constructor() {
    super(schema);
  }
  getAllPosts() {
    const queryObject = { deleted : false,
      status :  'accepted'};
    return this.schema.find(queryObject);
  }
  getOnly(username) {
    const queryObject = { deleted : false,
      status :  'accepted',
      username:username };
    return this.schema.find(queryObject);
  }
  getAll(username) {
    const queryObject = {
      username:username };
    return this.schema.find(queryObject);
  }
  getOnePost(_id) {
    const queryObject = { deleted : false,
      status :  'accepted'};
    return this.schema.find(queryObject);
  } 
}

module.exports = new posts();