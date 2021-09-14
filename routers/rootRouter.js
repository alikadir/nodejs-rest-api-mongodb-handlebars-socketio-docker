import { Router } from 'express';

import homeRouter from './homeRouter.js';
import productRouter from './productRouter.js';
import userRouter from './userRouter.js';

let rootRouter = Router();

rootRouter.use('/products', productRouter);
rootRouter.use('/users', userRouter);

rootRouter.use(['/home', '/index', '/'], homeRouter);

// Handle 404 - Keep this as a last route
rootRouter.use(function (req, res) {
  res.status(404).render('404');
});

export default rootRouter;
