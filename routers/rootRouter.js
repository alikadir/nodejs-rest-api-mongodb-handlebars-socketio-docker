import { Router } from 'express';

import homeRouter from './homeRouter.js';
import productRouter from './productRouter.js';
import userRouter from './userRouter.js';

let rootRouter = Router();

rootRouter.use('/products', productRouter);
rootRouter.use('/users', userRouter);

rootRouter.use(['/home', '/index', '/'], homeRouter);

export default rootRouter;
