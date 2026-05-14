import express from "express";
import protect from "../../common/middleware/auth.middleware.js";
import validate from "../../common/middleware/validate.middleware.js";
import * as commentController from "./comment.controller.js";
import CreateCommentDto from "./dto/create-comment.dto.js";

const router = express.Router();

// Standalone delete route
router.delete("/:id", protect, commentController.deleteComment);

export { router as commentStandaloneRouter };

// These are mounted inside project/blog routers
export default router;
