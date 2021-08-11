const blogRouter = require("express").Router();
const blogController = require("../controllers/blogController");
const middleware = require("../middleware");

blogRouter.get("/:id", blogController.readOne);
blogRouter.get("/", blogController.readAll);
blogRouter.post(
  "/",
  middleware.validateJwt,
  middleware.attachUser,
  blogController.createOne
);
blogRouter.put(
  "/:id",
  middleware.validateJwt,
  middleware.attachUser,
  blogController.updateOne
);
blogRouter.delete(
  "/:id",
  middleware.validateJwt,
  middleware.attachUser,
  blogController.deleteOne
);
blogRouter.delete("/", blogController.deleteAll);

module.exports = blogRouter;
