/* eslint-disable no-undef */
import dbController from '../Server/controllers/dbController.js';
import db from '../Server/Models/dbModels.js';

describe('db query unit tests', () => {
  const req = {};
  const res = { locals: {} };

  function next(e = null) { return e; }

  beforeAll(async () => {
    req.body = {
      name: 'Test',
      username: 'testUser',
      password: 'pass123',
      restId: '97q5nUQTuBo_h00XCxna2A',
      userId: 1,
    };
    const wait = [
      await db.query('DELETE FROM favorites;'),
      await db.query('DELETE FROM users;'),
      await db.query('DELETE FROM restaurants;'),
      await db.query('ALTER SEQUENCE users_id_seq RESTART WITH 1;'),
    ];
    return Promise.allSettled(wait);
  });

  afterAll(() => db.end(() => console.log('pool has ended')));

  describe('#createUser', () => {
    it('writes to the db', async () => {
      await dbController.createUser(req, res, next);
      expect(res.locals.result).toBe(1);
      expect(res.locals.userId).toBe(1);
    });
    it('creates a new user entry in the Users table', async () => {
      
      const params = ['testUser'];
      const data = await db.query('SELECT * FROM users WHERE username = $1;', params);
      expect(data.rows[0].username).toBe('testUser');
      expect(data.rows[0].name).toBe('Test');
      expect(data.rows[0].password).toBeTruthy();
    });
  });

  describe('#verifyUser', () => {
    let dbResponse;

    it('finds the username in the database and verifies the password', async () => {
      dbResponse = await dbController.verifyUser(req, res, next);
      expect(res.locals.userId).toBe(1);
    });
    it('returns an error when an incorrect password is used', async () => {
      req.body.password = 'ar;ogihaerg;o';
      dbResponse = await dbController.verifyUser(req, res, next);
      expect(dbResponse).toBeInstanceOf(Error);
    });
  });

  describe('#createFavorite', () => {
    it('adds a favorite to the db', async () => {
      const params = [req.body.userId, req.body.restId];
      await dbController.createFavorite(req, res, next);
      const favoritesResponse = await db.query('SELECT * FROM favorites WHERE user_id = $1 AND restaurant_id = $2;', params);
      expect(favoritesResponse.rows.length).toBe(1);
      const restaurantsResponse = await db.query('SELECT * FROM restaurants WHERE id = $1;', [req.body.restId]);
      expect(restaurantsResponse.rows.length).toBe(1);
    });
  });

  describe('#getFavorites', () => {
    it('retireives favorites from the db', async () => {
      await dbController.getFavorites(req, res, next);
      expect(res.locals.favorites).toBeInstanceOf(Array);
      expect(res.locals.favorites.length).toBeGreaterThan(0);
    });
  });
});
