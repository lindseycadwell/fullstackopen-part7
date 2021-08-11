const userRouter = require("express").Router();
const userController = require("../controllers/userController");

userRouter.get("/:id", userController.readOne);
userRouter.get("/", userController.readAll);
userRouter.post("/", userController.createOne);
userRouter.put("/:id", userController.updateOne);
userRouter.delete("/:id", userController.deleteOne);

module.exports = userRouter;
