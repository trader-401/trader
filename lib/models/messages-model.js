'use strict';
const schema = require('./messages-schema');
const Model = require('./model.js');
class Messages extends Model {
  constructor() {
    super(schema);
  }
  msgGet(id){
    return this.schema.find({roomId:id}).sort({'date': -1}).limit(20);
  }
  
}

module.exports = new Messages();