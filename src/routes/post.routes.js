import express from "express";

import PostController from "../controllers/post.controller.js";

const postRouter = express.Router();

postRouter.get("/Post", PostController.findAll);
postRouter.post("/Post", PostController.create);

export default postRouter;