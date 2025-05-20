import express from "express";

import UserController from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/User", UserController.findAll);
userRouter.post("/User", UserController.create);

export default userRouter;