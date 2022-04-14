import bcrypt from 'bcrypt';
import db from '../Models/dbModels.js';

const dbController = {};

// create user //signup
dbController.createUser = async (req, res, next) => {
  const { name, username, password } = req.body;
  try {
    console.log('in create user');
    console.log(name, username, password)
    const hash = await bcrypt.hash(password, 10);
    const params = [name, username, hash];
    const queryString = 'INSERT INTO users(name, username, password) VALUES($1, $2, $3) RETURNING id;';
    const result = await db.query(queryString, params);
    console.log('after query')
    res.locals.result = result.rowCount;
    res.locals.userId = result.rows[0].id;
    console.log('after setting')
  } catch (err) {
    console.log('error:', err);
    return next(err);
  }
  return next();
};

// verify user //login
dbController.verifyUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const data = await db.query('SELECT id, password FROM users WHERE username = $1;', [username]);
    const verified = await bcrypt.compare(password, data.rows[0].password);
    if (verified) res.locals.userId = data.rows[0].id;
    else throw new Error('you are NOT verified!');
  } catch (err) {
    return next(err);
  }
  return next();
};

// create favorite //
dbController.createFavorite = async (req, res, next) => {
  // request body rest_id and user_id
  try {
    const { restId, userId } = req.body;
    const params = [userId, restId];
    const queryString = 'WITH temp AS (INSERT INTO restaurants (id) VALUES($2) ON CONFLICT (id) DO NOTHING) INSERT INTO favorites(user_id, restaurant_id) VALUES($1, $2);';
    const result = await db.query(queryString, params);
  } catch (err) {
    return next(err);
  }
  return next();
};

// get favorites //
dbController.getFavorites = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const result = await db.query('SELECT restaurant_id FROM favorites WHERE user_id = $1;', [userId]);
    const favorites = result.rows;
    res.locals.favorites = favorites;
  } catch (err) {
    return next(err);
  }
  return next();
};

export default dbController;
