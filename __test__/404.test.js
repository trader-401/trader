'use strict';
const { server } = require('../lib/server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe('404 module', () => {
  it('should respond with 404 on invalied route (status)', () => {
    return mockRequest.get('/hello').then((results) => {
      expect(results.status).toBe(404);
    });
  });
  it('should respond with 404 on invalied route (statusMessage)', () => {
    return mockRequest.get('/hello').then((results) => {
      expect(results.json).toBeUndefined();
    });
  });
});