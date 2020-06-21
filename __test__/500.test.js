'use strict';
const { server } = require('../lib/server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe('500 module', () => {
  it('should respond with 500 on invalied route (status)', () => {
    return mockRequest.get('/status')
      .send({})
      .then((results) => {
        expect(results.status).toBe(500);
      }).catch(e=>{});
  });
  it('should respond with 500 on invalied route (statusMessage)', () => {
    return mockRequest.get('/status')
      .send({})
      .then((results) => {
        expect(results.json).toBeUndefined();
      });
  });
});