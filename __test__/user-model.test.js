'use strict';

require('@code-fellows/supergoose');

const Model = require('../lib/models/users-model.js');
const ModelPost = require('../lib/models/posts-model.js');
// const Model = new Model(usersSchema);

beforeAll(async () => {
  await Model.createUser({
    'username':'yasmin',
    'password':'1234',
  });

});

describe('Testin Model CRUD operations', () => {
  it('can create users', async () => {
    let user = await Model.createUser({
      'username':'yaso',
      'password':'1234',  
    });
    
    expect(user.username).toStrictEqual('yaso');
    expect(user.role).toStrictEqual('user');
  });
  // let post= {
  //   title:'car',
  //   description:'red',
  //   categories:'cars',
  // };
  it('create post to check if the post and user schema connecting', async ()=>{
    let post = await ModelPost.create({
      username:'yaso',
      title:'car',
      description:'red',
      categories:'cars',
    });
    expect(post.username).toStrictEqual('yaso');
    expect(post.title).toStrictEqual('car');
  });
  it('can read all users', async () => {
    let users = await Model.getUser();
    console.log('user',users);
    expect(users.length).toStrictEqual(2);
    expect(users[0].username).toStrictEqual('yasmin');
    expect(users[1].username).toStrictEqual('yaso');
  });

  it('can generate Token for user', async () => {
    let user = {
      'username':'yaso',
      'password':'1234',  
    };
    let users = await Model.generateToken(user);
    expect(typeof users).toEqual('string');

  });

});