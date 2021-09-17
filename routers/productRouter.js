import express from 'express';
import { body, param } from 'express-validator';
import { logMiddleware } from '../middlewares/logMiddleware.js';
import { validationMiddleware } from '../middlewares/validationMiddleware.js';
import {
  deleteRecord,
  findAll,
  insertRecord,
  replaceRecord,
  updateRecord,
} from '../services/databaseService.js';
const productRouter = express.Router();

productRouter.use(logMiddleware);

const collectionName = 'product';

productRouter.get('/', async (req, res) => {
  // /products?device.cpu.type=i11
  const filter = req.query;
  const result = await findAll(collectionName, filter);
  res.json(result);
});

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

productRouter.delete('/:productId', async (req, res) => {
  const productId = req.params.productId;
  const result = await deleteRecord(collectionName, { _id: productId });
  res.json(result);
});

export default productRouter;
