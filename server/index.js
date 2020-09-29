require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');
// const { useDebugValue } = require('react');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  const sql = `
  select
  "name", "price", "image", "productId", "shortDescription"
  from "products"
  `;
  db.query(sql)
    .then(result => {
      const products = result.rows;
      res.status(200).json(
        products
      );
    })
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const sql = `
  select *
  from "products"
  where "productId" = $1
  `;
  const productId = req.params.productId;
  const params = [productId];
  db.query(sql, params)
    .then(result => {
      const products = result.rows;
      // console.log(params);
      if (products.length === 0) {
        return next(new ClientError('Product does not exist', 404));
      }
      res.status(200).json(
        products
      );
    })
    .catch(err => next(err));
});

app.get('/api/cart', (req, res, next) => {
  res.json('');
});

app.post('/api/cart', (req, res, next) => {
  if (!req.body.productId) {
    res.status(400).json({ error: 'Product could not be found' });
  }
  const priceSQL = `
  select "price" from "products"
  where "productId" = $1
  `;
  const priceParams = [req.body.productId];
  db.query(priceSQL, priceParams)
    .then(result => {
      // console.log('price result', result);
      res.send('testing');
    })

    .catch(err => next(err));
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
