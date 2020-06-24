'use strict';
require('dotenv').config();
const schema = require('./users-schema');
const Model = require('./model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET = process.env.SECRET || 'ahmadkmal';

class users extends Model {
  
  constructor() {
    super(schema);
  }

  getUser(_id) {
    const queryObject = _id ? { _id } : {};
    return this.schema.find(queryObject);
  }

  async createUser(record) {
    console.log('record------>',record);
    try{
      let newRecord = new this.schema(record);
      let user = await newRecord.save();
      console.log('record after create and save------->',user);
      return user;
    }catch(err){
      console.log('rejected' , err);
      return Promise.reject('this user is already exist'); 
    }
  }



  async oauthUser(record) {
    console.log('oauth user------>',record);
    //   id: '104339221296275240999',
    //  email: 'eng.ahmadkmal@gmail.com',
    //  verified_email: true,
    // name: 'ahmad kmal',
    // given_name: 'ahmad',
    // family_name: 'kmal',
    // picture: 'https://lh3.googleusercontent.com/-uJPqCBsiagE/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnMI_QIDuc_7kCa6W2um4q3DFQf8A/photo.jpg',
    // locale: 'en'
    try{
      let oauthUser =await this.schema.find({username:record.id});
      if(oauthUser.length==0){
        let newRecord = new this.schema({username:record.id,password:'authPa55w0rd',email:record.email,fullName:record.name});
        let user = await newRecord.save();
        console.log('record after create and save google account------->',user);
        return user ;
      }else{
        return oauthUser[0];
      }
    }catch(err){
      console.log('rejected' , err);
      return Promise.reject('this user is already exist'); // ==>.catch
    }
  }
  
  async  generateToken(user){
    const token = await jwt.sign({ username: user.username,_id: user._id,role:user.role }, SECRET,{expiresIn: '1d'});
    return token;
  }

  async  authenticate(user, pass){
    try{
      let userInfo = await this.schema.find({username : user});
      console.log('userInfo inside authentication :',userInfo);
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
      console.log('tokenObject-------------------->',tokenObject);
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