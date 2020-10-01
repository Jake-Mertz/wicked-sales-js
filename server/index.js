require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');
// const { restart } = require('nodemon');
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
  if (!req.session.cartId) {
    return res.json([]);
  }
  const cartItemSQL = `
    select "c"."cartItemId",
    "c"."price",
    "p"."productId",
    "p"."image",
    "p"."name",
    "p"."shortDescription"
    from "cartItems" as "c"
    join "products" as "p" using ("productId")
    where "c"."cartId" = $1
  `;
  const cartId = [req.session.cartId];
  db.query(cartItemSQL, cartId)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
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
      const products = result.rows;
      if (products.length === 0) {
        throw new ClientError('Product does not exist', 404);
      }
      const cartSQL = `
        insert into "carts" ("cartId", "createdAt")
        values (default, default)
        returning "cartId"
      `;
      if (req.session.cartId) {
        return {
          cartId: req.session.cartId,
          price: products[0].price
        };
      }
      return db.query(cartSQL)
        .then(result => {
          const cart = result.rows[0];
          return {
            cartId: cart.cartId,
            price: products[0].price
          };
        });
    })
    .then(result => {
      req.session.cartId = result.cartId;
      const cartItemSQL = `
        insert into "cartItems" ("cartId", "productId", "price")
        values ($1, $2, $3)
        returning "cartItemId"
      `;
      const cartItemParams = [result.cartId, req.body.productId, result.price];
      return db.query(cartItemSQL, cartItemParams);
    })
    .then(result => {
      const cartItemSQL = `
        select "c"."cartItemId",
        "c"."price",
        "p"."productId",
        "p"."image",
        "p"."name",
        "p"."shortDescription"
        from "cartItems" as "c"
        join "products" as "p" using ("productId")
        where "c"."cartItemId" = $1
      `;
      const cartItem = [result.rows[0].cartItemId];
      return db.query(cartItemSQL, cartItem);
    })
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.post('/api/orders', (req, res, next) => {
  if (!req.session.cartId) {
    res.status(400).json({ error: 'You have no cart' });
  }
  if (!req.body.name || !req.body.creditCard || !req.body.shippingAddress) {
    res.status(400).json({ error: 'Your credentials are incomplete' });
  }
  const sql = `
  insert into "orders" ("cartId", "name", "creditCard", "shippingAddress")
  values ($1, $2, $3, $4)
  returning "orderId", "createdAt", "name", "creditCard", "shippingAddress"
  `;
  const orderDetails = [req.session.cartId, req.body.name, req.body.creditCard, req.body.shippingAddress];
  db.query(sql, orderDetails)
    .then(result => {
      delete req.session.cartId;
      res.status(201).json(result.rows);
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
