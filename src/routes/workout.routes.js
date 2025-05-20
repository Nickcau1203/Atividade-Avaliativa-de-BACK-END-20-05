import express from "express";

import WorkoutController from "../controllers/workout.controller.js";

const workoutRouter = express.Router();

workoutRouter.get("/Workout", WorkoutController.findAll);
workoutRouter.post("/Workout", WorkoutController.create);

export default workoutRouter;