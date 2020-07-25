'use strict';
const schema = require('./category-schema');
const Model = require('./model.js');
class Categories extends Model {
  constructor() {
    super(schema);
  }

}

module.exports = new Categories();