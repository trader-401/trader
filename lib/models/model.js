'use strict';
/**
 * 
 * @module model 
 * @class Model
 * @constructor this is model to handel the function for mongodb to do all the functionalty
 * @param {schema} the schema file to has this function
 */
class Model {
  constructor(schema) {
    this.schema = schema;
  }
  /**
   * @function get this gunction will return the opject that have the entered id / if there is no entered number it will return all object
   * @param {string} _id this is id to get object that have this id 
   */
  get(_id) {
    const queryObject = _id ? { _id } : {};
    return this.schema.find(queryObject);
  }
  /**
   * @function create this function wil creat new object art db 
   * @param {object} record this is object that will be created  
   */
  create(record) {
    const newRecord = new this.schema(record);
    return newRecord.save();
  }
  /**
   * @function update this function will return the object after it has been updated 
   * @param {string} _id this is the id that will be updated 
   * @param {object} record object that have the data to update the object with
   */
  update(_id, record) {
    return this.schema.findByIdAndUpdate(_id, record, { new: true });
  }
  /**
   * @function delete this is function return the function that hhas been dldeted from db
   * @param {string} _id the id of object that will be deleted 
   */
  delete(_id) {
    return this.schema.findByIdAndDelete(_id);
  }
}

module.exports = Model;