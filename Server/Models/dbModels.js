import { Pool } from 'pg';

let PG_URI;
if (process.env.TEST === 'true') {
  PG_URI = 'postgres://ikuuyrhe:gT1O5WEMLCn4LQ_2CbqEVicD7BZ6FYCd@rajje.db.elephantsql.com/ikuuyrhe';
} else {
  PG_URI = 'postgres://opxthsse:UVoOsA-nfW4s_U0k1RqNNEq_5Efwo3Xw@rajje.db.elephantsql.com/opxthsse';
}
// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI,
  // idleTimeoutMillis: 2000,
  // allowExitOnIdle: true,
});

// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database
export default {
  query: (text, params, callback) => pool.query(text, params, callback),
  end: () => pool.end(),
};
