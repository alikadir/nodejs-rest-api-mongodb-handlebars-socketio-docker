import express from 'express';
import exphbs from 'express-handlebars';

import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
const app = express();

// view engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('home', { users: [{ name: 'foo' }, { name: 'bar' }, { name: 'baz' }], title: 'Welcome' });
});

app.use('/products', productRouter);
app.use('/users', userRouter);

export default app;
