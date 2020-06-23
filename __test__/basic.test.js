'use strict';

const basic = require('../lib/middleware/basic.js');
let res = {};
let next = jest.fn(); 
const base64 = require('base-64');
let header={
  headers:{
    'authorization':'yasmin:1234',
  },
};
let header3=base64.encode(header.headers.authorization);
describe('basic auth ', () => {

  it('should respond with error', () => {
    let req = { headers: { authorization: null } };
    basic(req, res, next);
    expect(next).toHaveBeenCalled();
  });
  it('should respond with error', () => {
    let req = { headers: { authorization: 'Basic dasdr54sada6scac1a' } };
    basic(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});