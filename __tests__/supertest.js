// const request = require('supertest');
import request from 'supertest';

const server = 'http://localhost:3000';

describe('Route integration', () => {
  describe('/', () => {
    describe('GET', () => {
      it('Should serve the html file and respond with status of 200', () => request(server)
        .get('/')
        .then(response => {
          console.log(response);
          return response;
        })
        .expect('Content-Type', /text\/html/)
        .expect(200));
    });
  });
});
