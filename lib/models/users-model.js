'use strict';
const schema = require('./users-schema');
const Model = require('./model1.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET = process.env.SECRET || 'ahmadkmal';
class users extends Model {
  constructor() {
    super(schema);
  }
  async createUser(record) {
    /**
   * record
   * {username:"mahmoud",password:"1234"}
   */
    console.log('record------>',record);
    try{
      // console.log('inside creat');
      // record.password = await bcrypt.hash(record.password, 5);
      
      let newRecord = new this.schema(record);
      console.log('record after create and save------->',newRecord);
      return await newRecord.save();
    }catch(err){
      console.log('rejected');
      return Promise.reject('this user is already exist'); // ==>.catch
    }
  }
  async  generateToken(user){
    const token = await jwt.sign({ username: user.username,_id: user._id,role:user.role }, SECRET,{expiresIn: '1d'});
    return token;
  }
  async  authenticate(user, pass){
    let userInfo = await this.schema.find({username : user});
    console.log('userInfo inside authentication :',userInfo);
    try{
      const valid = await bcrypt.compare(pass, userInfo[0].password);
      console.log('valid or not :',valid);
      return valid ? userInfo : Promise.reject('wrong password');
    }catch(e){
      console.log(e.message);
    }
  }
  async  authenticateToken(token){
    try {
      const tokenObject = await jwt.verify(token, SECRET);
      // tokenObject = {username:"mahmoud",iat:91223238}
      const db= await this.schema.find({ _id: tokenObject._id } );
      if (db.length) {
        console.log('db.token--->',db[0].token,'received token---->',token);
        if(db[0].token===token){
          return Promise.resolve(tokenObject);
        }
        return Promise.reject('session end for this token');  
      } else {
        return Promise.reject('User is not found!');
      }
    } catch (e) {
      return Promise.reject(e.message);
    }
  }
}

module.exports = new users();