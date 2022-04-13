import fs from 'fs';
// import path from 'path';
import * as path from 'path';
import apiController from '../Server/controllers/apiController.js';
jest.setTimeout(10000);

// mock database file
//const testJsonFile = path.resolve(__dirname, '../server/db/markets.test.json');

describe('Yelp query unit tests', () => {
  let req = {};
  let res = { locals: {}};
  // let res = { locals: {}};

  function next() {
  }

  beforeAll((done) => {
    req.query = {
      searchTerm: 'chinese',
      searchLocation: '11211',
    };
    done();
  });

  describe('#getRestaurantList', () => {
    it('returns restaurant objects as an array', async () => {
      await apiController.getRestaurantList(req, res, next);
      expect(res.locals.restaurants).toBeInstanceOf(Array);
      expect(res.locals.restaurants.length).toBeLessThan(11);
      expect(res.locals.restaurants[0]).toBeInstanceOf(Object);
      //console.log(res.locals.restaurants);
    });
  });
});
