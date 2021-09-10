import express from 'express';
const productRouter = express.Router();

// middleware for product router
productRouter.use(async (req, res, next) => {
  console.timeStamp('product router call start ' + req.method);
  await next();
  console.timeStamp('product router call end ' + req.method);
});

productRouter.get('/', (req, res) => {
  res.json([1, 2, 3]);
});

productRouter.get('/:id', (req, res) => {
  res.json([req.params.id]);
});

productRouter.post('/', (req, res) => {
  res.json([1, 2, 3, 4]);
});

export default productRouter;
