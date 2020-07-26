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
      expect(results.status).toBe(404);
    });
  });
});
describe('products routes  ' , ()=>{
  it('should respond with 404 on an invalid route',()=>{
    return mockRequest.get('/test').then((result)=>{
      expect(result.status).toBe(404);
    });
  });
  it('should respond with 404 on an invalid method',()=>{
    return mockRequest.delete('/test/5').then((result)=>{
      expect(result.status).toBe(404);
    });
  });
  it('should respond with 404 on an invalid method',()=>{
    return mockRequest.put('/test/5').then((result)=>{
      expect(result.status).toBe(404);
    });
  });
  it('should respond with 404 on an invalid method',()=>{
    return mockRequest.post('/test').then((result)=>{
      expect(result.status).toBe(404);
    });
  });
});