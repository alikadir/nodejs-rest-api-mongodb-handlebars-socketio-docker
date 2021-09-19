import express from 'express';
import { logMiddleware } from '../middlewares/logMiddleware.js';
const userRouter = express.Router();

userRouter.use(logMiddleware);

userRouter.get('/', (req, res) => {
  res.json(['a', 'b', 'c']);
});

export default userRouter;

