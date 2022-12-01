import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";

const router = new Router();

router.get("/", mainController.getDoneExercises);
router.post("/", mainController.createSubmission);
router.get("/exercise/:exercise/user/:user", mainController.testSockets)
router.get("/:exerciseName", mainController.getSubmissionsByExercise);

export { router };