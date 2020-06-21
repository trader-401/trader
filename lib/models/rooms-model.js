'use strict';
const schema = require('./rooms-schema');
const Model = require('./model.js');
class rooms extends Model {
  constructor() {
    super(schema);
  }

  async userJoin(firstUser,SecondUser) {
    try{
      let firstFind = this.schema.find({firstUser,SecondUser});
      let secondFind = this.schema.find({firstUser:SecondUser,SecondUser:firstUser});
      if(firstFind.length===0&&secondFind.length===0){
        return await this.create({firstUser,SecondUser});
      }
      return firstFind.length>0?firstFind:secondFind;
    }catch(err){
      console.log(err);
    }
  }
  
}

module.exports = new rooms();