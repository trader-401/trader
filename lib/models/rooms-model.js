'use strict';
const schema = require('./rooms-schema');
const Model = require('./model.js');
class rooms extends Model {
  constructor() {
    super(schema);
  }

  async userJoin(firstUser,secondUser) {
    try{
      let firstFind = await this.schema.find({firstUser,secondUser});
      let secondFind = await this.schema.find({firstUser:secondUser,secondUser:firstUser});
      // console.log('firstUser',firstFind ,'secondUser',secondFind);
      if(firstFind.length===0&&secondFind.length===0){
        return await this.create({firstUser,secondUser});
      }
      return firstFind.length>0?firstFind[0]:secondFind[0];
    }catch(err){
      console.log(err);
    }
  }
  
}

module.exports = new rooms();