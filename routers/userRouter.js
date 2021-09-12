import express from "express";
const userRouter = express.Router();

// middleware for user router
userRouter.use(async (req, res, next) => {
  console.timeStamp("user router call start " + req.method);
  await next();
  console.timeStamp("user router call end " + req.method);
});

userRouter.get("/", (req, res) => {
  res.json(["a", "b", "c"]);
});

export default userRouter;
