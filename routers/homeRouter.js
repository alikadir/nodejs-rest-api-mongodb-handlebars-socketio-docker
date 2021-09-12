import express from "express";
const homeRouter = express.Router();

homeRouter.get("/", (req, res) => {
  res.render("home", { users: [{ name: "foo" }, { name: "bar" }, { name: "baz" }], title: "Welcome" });
});

export default homeRouter;
