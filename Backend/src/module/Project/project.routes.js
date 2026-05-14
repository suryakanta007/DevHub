import express from "express";
import protect from "../../common/middleware/auth.middleware.js";
import validate from "../../common/middleware/validate.middleware.js";
import * as projectController from "./project.controller.js";
import CreateProjectDto from "./dto/create-project.dto.js";
import UpdateProjectDto from "./dto/update-project.dto.js";

const router = express.Router();

router.post("/", protect, validate(CreateProjectDto), projectController.createProject);
router.get("/", projectController.listProjects);
router.get("/:id", projectController.getProject);
router.patch("/:id", protect, validate(UpdateProjectDto), projectController.updateProject);
router.delete("/:id", protect, projectController.deleteProject);
router.post("/:id/like", protect, projectController.toggleLike);
router.post("/:id/save", protect, projectController.toggleSave);

export default router;
