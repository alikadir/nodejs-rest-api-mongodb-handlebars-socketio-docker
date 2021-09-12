import express from 'express';
import bodyParser from 'body-parser';
import exphbs from 'express-handlebars';

import rootRouter from './routers/rootRouter.js';

const app = express();
app.use(bodyParser.json());

app.use(express.static('public'));

// view engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use('/', rootRouter);

console.log(process.env.DATABASE_URL);

export default app;
