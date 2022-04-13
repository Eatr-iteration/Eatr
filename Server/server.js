import express from 'express';
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';
import apiController from './controllers/apiController.js';

// const __filename = import.meta.url;
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// statically serve everything in the build folder on the route '/dist'
app.use('/', express.static(path.join(__dirname, '../dist')));

// Route handlers
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../dist/index.html'));
});

app.get('/restaurants', apiController.getRestaurantList, (req, res) => res.status(200).send(res.locals.restaurants));

// Unknown Route Handler
app.get('/*', (req, res) => res.status(404).send('404 No Food Found!'));

// Global Error Handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// Start listening on specified port
export default app.listen(3000);
