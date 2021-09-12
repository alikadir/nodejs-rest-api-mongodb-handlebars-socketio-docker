import express from 'express';
import { insertRecord } from '../services/databaseService.js';
const productRouter = express.Router();

const collectionName = 'product';

// middleware for product router
productRouter.use(async (req, res, next) => {
  console.log('product router call start ' + req.method);
  await next();
  console.log('product router call end ' + req.method);
});

productRouter.get('/', (req, res) => {
  res.json([1, 2, 3]);
});

productRouter.get('/:id', (req, res) => {
  res.json([req.params.id]);
});

productRouter.post('/', async (req, res) => {
  const product = req.body;
  const result = await insertRecord(collectionName, product);
  res.json(result);
});

export default productRouter;
