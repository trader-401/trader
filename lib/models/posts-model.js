'use strict';
const schema = require('./posts-schema');
const Model = require('./model.js');
class posts extends Model {
  constructor() {
    super(schema);
  }
  async getOnePost(_id) {
    const queryObject = { deleted : false,
      status :  'accepted',_id};
      console.log('getdbonepost------>',_id,queryObject);
    return (await this.schema.find(queryObject))[0];
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
    const queryObject = { deleted : false,
      username:username };
    return this.schema.find(queryObject);
  }
  
}

module.exports = new posts();