'use strict';

require('@code-fellows/supergoose');
const users = require('../lib/models/users-model.js');

describe('users Model', () => {
  const obj = { username : 'yasmin' , password: '1234'};
  it('create method (post)', () => {
    return users.create(obj).then((result) => {
      Object.keys(obj).forEach((key) => {
        expect(result[key]).toEqual(obj[key]);
      });
    });
  });
});