'use strict';

require('@code-fellows/supergoose');

const Model = require('../lib/models/users-model.js');

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

  it('can read all users', async () => {
    let users = await Model.getUser();
    console.log('user',users);

    // expect(users.length).toStrictEqual(2);
    // expect(users[0].username).toStrictEqual('yasmin');
    // expect(users[1].username).toStrictEqual('yaso');
  });

  //   it('can update a user', async () => {
  //     let user = await Model.readByQuery({'username':'Thor'});

  //     console.log('user:', user[0]._id);

  //     let newRecord = {
  //       'username': 'FatThor',
  //       'paassword': 'Lebowski',
  //     };

  //     let updatedUser = await Model.update(user[0]._id, newRecord);
  //     console.log('updatedUser:', updatedUser);

  //     expect(updatedUser.username).toStrictEqual('FatThor');
  //   });

  //   it('can delete a user', async () => {
  //     let user = await Model.readByQuery({'username':'Groot'});

  //     let userID = user[0]._id;

  //     let deletedID = await Model.delete(userID);

  //     expect(deletedID).toStrictEqual(userID);
  //   });

});