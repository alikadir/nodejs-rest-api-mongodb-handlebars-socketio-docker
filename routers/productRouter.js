import express from 'express';
import { body, param } from 'express-validator';
import { validationMiddleware } from '../middlewares/validationMiddleware.js';
import { insertRecord, replaceRecord, updateRecord } from '../services/databaseService.js';
const productRouter = express.Router();

const collectionName = 'product';

productRouter.post(
  '/',
  validationMiddleware([
    body('title').notEmpty(),
    body('price').isFloat({ min: 0 }),
    body('warehouse.city').notEmpty(),
  ]),
  async (req, res) => {
    const product = req.body;
    const result = await insertRecord(collectionName, product);
    res.json(result);
  }
);

productRouter.put(
  '/:productId',
  validationMiddleware([
    body('title').notEmpty(),
    body('price').isFloat({ min: 0 }),
    body('warehouse.city').notEmpty(),
    param('productId').notEmpty(),
  ]),
  async (req, res) => {
    const productId = req.params.productId;
    const product = req.body;
    const result = await replaceRecord(collectionName, { _id: productId }, product);
    res.json(result);
  }
);

productRouter.patch('/:productId', async (req, res) => {
  const productId = req.params.productId;
  const product = req.body;
  const result = await updateRecord(collectionName, { _id: productId }, product);
  res.json(result);
});

// middleware for product router
productRouter.use(async (req, res, next) => {
  console.log('product router call start ' + req.method);
  await next();
  console.log('product router call end ' + req.method);
});

export default productRouter;
