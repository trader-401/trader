'use strict';

require('@code-fellows/supergoose');
const { server } = require('../lib/server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);
const base64 = require('base-64');
jest.fn();
let id;
let AdminToken;

describe('test all routes in the server', () => {

  describe('Admin role', () => {
    let obj = {'username': 'yasmin', 'password': '1234' , 'role':'admin'};
    let header={
      headers:{
        'authorization':'yasmin:1234',
      },
    };
    let header3=base64.encode(header.headers.authorization);
    describe('users routes', () => {
      it('/signup as valid user', ()=>{
        return  mockRequest.post('/signup')
          .send(obj)
          .then(result=>{
            expect(result.status).toEqual(200);
            expect(typeof result.body.token).toEqual('string');
          });
      });
      it('/signin as valid user', ()=>{
        let header3=base64.encode(header.headers.authorization);
        return mockRequest.post('/signin').set({'authorization':`Basic ${header3}`})
          .send(obj)
          .then(data=>{
            AdminToken=data.body.token;
            // console.log(AdminToken, 'AdminTokennnnnnnnnnnnnnnnnnnn');
            expect(data.status).toEqual(200);
            expect(typeof data.body.token).toEqual('string');
          }); 
      });
      it('get all /users', ()=>{
        return mockRequest.get('/users').set({'authorization':`Basic ${header3}`})
          .send(obj)
          .then(data=>{
            // console.log(data.body, 'tesssssssst dataaaaaaa');
            expect(data.status).toEqual(200);
            expect(Array.isArray(data.body)).toBe(true);
          }); 
      });
    });
    describe('admin routes', () => {
      let post= {
        title:'car',
        description:'red',
        categories:'cars',
      };
      it('/user/:username to post a new post', ()=>{
        return  mockRequest.post('/user/yasmin')
          .set({'authorization':`Bearer ${AdminToken}`})
          .send(post)
          .then(result=>{
            const record = result.body;
            // console.log(record,'reeeeeeeeeee');
            Object.keys(post).forEach((key) => {
              expect(record[key]).toEqual(post[key]);
              expect(result.status).toEqual(200);
              expect(record.status).toEqual('pending');
              expect(record.username).toEqual('yasmin');
            });
          });
      });
      it('/status to get all posts in the database (pending,acceptedand rejected)', ()=>{
        return  mockRequest.get('/status')
          .set({'authorization':`Bearer ${AdminToken}`})
          .send(post)
          .then(result=>{
            const record = result.body;
            // console.log(record.results[0],'reeeeeeeeeeefffff');
            id = record.results[0]._id;
            expect(result.status).toEqual(200);
            expect(Array.isArray(record.results)).toBe(true);
            expect(record.results.length).toEqual(1);
          });
      });
      it('/status/:id to get post from the database', ()=>{
        return  mockRequest.get(`/status/${id}`)
          .set({'authorization':`Bearer ${AdminToken}`})
          .send(post)
          .then(result=>{
            const record = result.body;
            // console.log(record,'reeeeeeeeeeefffff');
            expect(result.status).toEqual(200);
            expect(record[0].status).toEqual('pending');
          });
      });
      it('/status/:id to get post from the database and update it', ()=>{
        return  mockRequest.put(`/status/${id}`)
          .set({'authorization':`Bearer ${AdminToken}`})
          .send({status:'accepted'})
          .then(result=>{
            const record = result.body;
            // console.log(record,'reeeeeeeeeeefffff');
            expect(result.status).toEqual(200);
            expect(record.status).toEqual('accepted');
          });
      });
      it('/statusBy/:categories to get post from the database by category', ()=>{
        return  mockRequest.get(`/statusBy/cars`)
          .set({'authorization':`Bearer ${AdminToken}`})
          .send({status:'accepted'})
          .then(result=>{
            const record = result.body;
            // console.log(record,'reeeeeeeeeeefffff');
            expect(result.status).toEqual(200);
            expect(record[0].categories).toEqual('cars');
          });
      });
    });
    describe('posts routes', () => {
      let postUser= {
        title:'car',
        description:'red',
        categories:'cars',
      };
      it('/user/:username to add a post', ()=>{
        return  mockRequest.post('/user/yasmin')
          .set({'authorization':`Bearer ${AdminToken}`})
          .send(postUser)
          .then(result=>{
            const record = result.body;
            // console.log(record,'reeeeeeeeeee');
            Object.keys(postUser).forEach((key) => {
              expect(record[key]).toEqual(postUser[key]);
              expect(result.status).toEqual(200);
              expect(record.status).toEqual('pending');
              expect(record.username).toEqual('yasmin');
            });
          });
      });
      it('/user/all accepted posts', ()=>{
        return  mockRequest.get('/all')
          .set({'authorization':`Bearer ${AdminToken}`})
          .then(result=>{
            const record = result.body;
            // console.log(record,'reeeeeeeegggggggggggggeee');
            id = record[0]._id;
            // console.log('this is the id', id);
            expect(result.status).toEqual(200);
            expect(Array.isArray(record)).toBe(true);
            expect(record.length).toEqual(1);
          });
      });
      it('/searchBy/:categories to find posts by category', ()=>{
        return  mockRequest.get('/searchBy/cars')
          .set({'authorization':`Bearer ${AdminToken}`})
          .then(result=>{
            const record = result.body;
            // console.log('reeeeeefffffffeeeee', record,'reeeeeeeeeee');
            expect(result.status).toEqual(200);
            expect(record[0].status).toEqual('accepted');
            expect(record[0].username).toEqual('yasmin');
          });
      });
      it('/user/:id to find post and update it', ()=>{
        return  mockRequest.put(`/user/${id}`)
          .set({'authorization':`Bearer ${AdminToken}`})
          .send({categories:'bike'})
          .then(result=>{
            const record = result.body;
            // console.log(record,'reeeeeeeeeee');
            expect(result.status).toEqual(200);
            expect(record.categories).toEqual('bike');
            expect(record.username).toEqual('yasmin');
          });
      });
      it('/search/:id to find post and update it', ()=>{
        return  mockRequest.delete(`/search/${id}`)
          .set({'authorization':`Bearer ${AdminToken}`})
          .then(result=>{
            const record = result.body;
            // console.log(record,'reeeeeeeeeee');
            expect(result.status).toEqual(200);
            expect(record.deleted).toEqual(true);
          });
      });
    });
  });

  /////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////

  let userToken;
  describe('users role', () => {
    let obj2 = {'username': 'hussein', 'password': '1234' , 'role':'user'};
    let header2={
      headers:{
        'authorization':'hussein:1234',
      },
    };
    describe('users routes for user role', () => {
      it('/signup as valid user', ()=>{
        return  mockRequest.post('/signup')
          .send(obj2)
          .then(result=>{
            expect(result.status).toEqual(200);
            expect(typeof result.body.token).toEqual('string');
          });
      });
      it('/signin as valid user', ()=>{
        let header3=base64.encode(header2.headers.authorization);
        return mockRequest.post('/signin').set({'authorization':`Basic ${header3}`})
          .send(obj2)
          .then(data=>{
          //  console.log(data.body, 'tesssssssst dataaaaaaa');
            userToken=data.body.token;
            expect(data.status).toEqual(200);
            expect(typeof data.body.token).toEqual('string');
          }); 
      });
      it('get all /users', ()=>{
        let header3=base64.encode(header2.headers.authorization);
        return mockRequest.get('/users').set({'authorization':`Basic ${header3}`})
          .send(obj2)
          .then(data=>{
            // console.log(data.body, 'tesssssssst dataaaaaaa');
            expect(data.status).toEqual(200);
            expect(Array.isArray(data.body)).toBe(true);
          }); 
      });
    });
    describe('admin routes for user role', () => {
      let post= {
        title:'car',
        description:'red',
        categories:'cars',
      };
      it('/user/:username to post a new post', ()=>{
        return  mockRequest.post('/user/hussein')
          .set({'authorization':`Bearer ${userToken}`})
          .send(post)
          .then(result=>{
            const record = result.body;
            // console.log(record,'reeeeeeeeeee');
            Object.keys(post).forEach((key) => {
              expect(record[key]).toEqual(post[key]);
              expect(result.status).toEqual(200);
              expect(record.status).toEqual('pending');
              expect(record.username).toEqual('hussein');
            });
          });
      });
      it('/status to get all posts in the database (pending,acceptedand rejected)', ()=>{
        return  mockRequest.get('/status')
          .set({'authorization':`Bearer ${userToken}`})
          .send(post)
          .then(result=>{
            const record = result.body;
            // console.log(record,'reeeeeeeeeeefffff');
            expect(result.status).toEqual(500);
            expect(record).toEqual({error: 'you are not authorize to Access this rote!!' });
          });
      });
      it('/status/:id to get post from the database', ()=>{
        return  mockRequest.get(`/status/${id}`)
          .set({'authorization':`Bearer ${userToken}`})
          .send(post)
          .then(result=>{
            const record = result.body;
            // console.log(record,'reeeeeeeeeeefffff');
            expect(result.status).toEqual(500);
            expect(record).toEqual({error: 'you are not authorize to Access this rote!!' });
          });
      });
      it('/status/:id to get post from the database and update it', ()=>{
        return  mockRequest.put(`/status/${id}`)
          .set({'authorization':`Bearer ${userToken}`})
          .send({status:'accepted'})
          .then(result=>{
            const record = result.body;
            // console.log(record,'reeeeeeeeeeefffff');
            expect(result.status).toEqual(500);
            expect(record).toEqual({error: 'you are not authorize to Access this rote!!' });
          });
      });
    });
    describe('posts routes functionality with user role', () => {
      let id;
      let postUser= {
        title:'car',
        description:'red',
        categories:'cars',
      };
      it('/user/:username to add a post', ()=>{
        return  mockRequest.post('/user/hussein')
          .set({'authorization':`Bearer ${userToken}`})
          .send(postUser)
          .then(result=>{
            const record = result.body;
            id = record._id;
            Object.keys(postUser).forEach((key) => {
              expect(record[key]).toEqual(postUser[key]);
              expect(result.status).toEqual(200);
              expect(record.status).toEqual('pending');
              expect(record.username).toEqual('hussein');
            });
          });
      });
      it('/user/all accepted posts', ()=>{
        return  mockRequest.get('/all')
          .set({'authorization':`Bearer ${userToken}`})
          .then(result=>{
            const record = result.body;
            console.log(record,'reeeeeeeeeeefffffffffffffffffffffff');
            expect(result.status).toEqual(200);
            expect(Array.isArray(record)).toBe(true);
            expect(record.length).toEqual(0);
          });
      });
      it('/status/:id to get post from the database and update it', ()=>{
        return  mockRequest.put(`/status/${id}`)
          .set({'authorization':`Bearer ${AdminToken}`})
          .send({status:'accepted'})
          .then(result=>{
            const record = result.body;
            expect(result.status).toEqual(200);
            expect(record.status).toEqual('accepted');
          });
      });
      it('/searchBy/:categories to find posts by category', ()=>{
        return  mockRequest.get('/searchBy/cars')
          .set({'authorization':`Bearer ${userToken}`})
          .then(result=>{
            const record = result.body;
            // console.log(record,'reeeeeeeeeeefffffffffffffffffffffffffff');
            expect(result.status).toEqual(200);
            expect(Array.isArray(record)).toBe(true);
            expect(record.length).toEqual(1);
          });
      });
      it('/user/:id to find post and update it', ()=>{
        return  mockRequest.put(`/user/${id}`)
          .set({'authorization':`Bearer ${userToken}`})
          .send({categories:'bike'})
          .then(result=>{
            const record = result.body;
            // console.log(record,'reeeeeeeeeee');
            expect(result.status).toEqual(200);
            expect(record.categories).toEqual('bike');
            expect(record.username).toEqual('hussein');
          });
      });
      it('/search/:id to find post and update it', ()=>{
        return  mockRequest.delete(`/search/${id}`)
          .set({'authorization':`Bearer ${userToken}`})
          .then(result=>{
            const record = result.body;
            // console.log(record,'reeeeeeeeeee');
            expect(result.status).toEqual(200);
            expect(record.deleted).toEqual(true);
          });
      });
    });
  });
  /////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////
  describe('user-routes', () => {
    it('/user/:username to see other user\'s posts', ()=>{
      return  mockRequest.get(`/user/yasmin`)
        .set({'authorization':`Bearer ${AdminToken}`})
        .then(result=>{
          const record = result.body;
          expect(result.status).toEqual(200);
          expect(Array.isArray(record)).toBe(true);
          expect(record[0].username).toEqual('yasmin');
          expect(record.length).toEqual(2);
        });
    });
    it('/addfav/:id to add other user\'s posts to favorite', ()=>{
      return  mockRequest.get(`/addfav/${id}`)
        .set({'authorization':`Bearer ${AdminToken}`})
        .then(result=>{
          const record = result.body;
          console.log(record,'reeeeeeeeeee');
          expect(result.status).toEqual(200);
          expect(record).toEqual('Post Add to Fav');
        });
    });
    it('/fav to see other user\'s posts', ()=>{
      return  mockRequest.get(`/fav`)
        .set({'authorization':`Bearer ${userToken}`})
        .then(result=>{
          const record = result.body;
          // console.log(record,'reeeeeeeeeee');
          expect(result.status).toEqual(200);
          expect(Array.isArray(record)).toBe(true);
        });
    });
  });
});
// });